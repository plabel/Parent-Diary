
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { createHash, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import * as AES from 'crypto-js/aes';
import * as enc from 'crypto-js/enc-utf8';
import { LogInDto } from './dto/log-in.dto';
import { authenticator } from 'otplib';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
  ) {}
  /**
   * Create a user
   * @param user - The user to create
   * @returns The created user
   */
  create(user: Omit<User, 'id' | 'isEmailVerified'>): Promise<User> {
    return this.userModel.create(user);
  }
  /**
   * Delete a user
   * @param id - The ID of the user to delete
   * @returns True if the user was deleted, false otherwise
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.destroy({
      where: { id },
    });
    return result === 1;
  }
  /**
   * Generate an encrypted secret key
   * @returns The encrypted secret key
   */
  generateEncryptedSecretKey(): string {
    const secretKey = randomBytes(32).toString('hex');
    const encryptedSecretKey = AES.encrypt(secretKey, this.configService.get('master_key')).toString(enc.Utf8);
    return encryptedSecretKey;
  }
  /**
   * Decrypt a secret key
   * @param encryptedSecretKey - The encrypted secret key to decrypt
   * @returns The decrypted secret key
   */
  decryptSecretKey(encryptedSecretKey: string): string {
    const secretKeyRaw = AES.decrypt(encryptedSecretKey, this.configService.get('master_key')).toString(enc.Utf8);
    return Buffer.from(secretKeyRaw, 'hex').toString();
  }
  /**
   * Hash a password
   * @param password - The password to hash
   * @param salt - The salt to use
   * @returns The hashed password
   */
  hashPassword(password: string, salt: string): string {
    const seasonedPassword = `${salt}${password}${this.configService.get('pepper')}`;
    return createHash('sha256').update(seasonedPassword).digest('hex');
  }
  /**
   * Log in a user
   * @param logInDto - The log in data
   * @returns The user if the log in is successful, null otherwise
   */
  async logIn(logInDto: LogInDto): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        email: logInDto.email,
        isEmailVerified: true
      }
    });
    if (!user) {
      return null;
    }
    if (user.dataValues.passwordHash !== this.hashPassword(logInDto.password, user.dataValues.salt)) {
      return null;
    }
    const otpSecret = user.dataValues.otpSecret;
    const isOTPValid = authenticator.verify({ token: logInDto.otp, secret: otpSecret });
    if (!isOTPValid) {
      const isRecoveryCodeValid = user.dataValues.recoveryCode === logInDto.recoveryCode;
      if(isRecoveryCodeValid) {
        return user;
      }
      return null;
    } else {
      return user;
    }
  }
  /**
   * Get a user by email
   * @param email - The email of the user to get
   * @returns The user if found, null otherwise
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email }
    });
  }
  /**
   * Get a user by ID
   * @param id - The ID of the user to get
   * @returns The user if found, null otherwise
   */
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
  async resetPassword(token: string, password: string): Promise<boolean> {
    const buffer = AES.decrypt(token, this.configService.get('master_key'));
    const decryptedToken = Buffer.from(buffer.toString(enc.Utf8), 'hex').toString();
    const tokenObj = JSON.parse(decryptedToken);
    if (tokenObj.creationDate < Date.now() - 1000 * 60 * this.configService.get('token_expiration_time_in_minutes')) {
      throw new Error('Token expired');
    }
    const salt: string = randomBytes(20).toString('hex');
    const user = await this.userModel.update({
      passwordHash: this.hashPassword(password, salt),
      salt: salt,
      encryptedSecretKey: this.generateEncryptedSecretKey()
    }, {
      where: { id: tokenObj.token }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return true;
  }
  /**
   * Confirm a user's email
   * @param token - The token to confirm the email
   * @returns The user and the key URI
   */
  async confirmEmail(token: string): Promise<{ user: User, keyUri: string }> {
    const otpSecret = authenticator.generateSecret();
    const otpToken = authenticator.generate(otpSecret);
    const isOTPValid = authenticator.verify({ token: otpToken, secret: otpSecret });
    if (!isOTPValid) {
      throw new Error('Invalid OTP');
    }
    const buffer = AES.decrypt(token, this.configService.get('master_key'));
    const decryptedToken = Buffer.from(buffer.toString(enc.Utf8), 'hex').toString();
    const tokenObj = JSON.parse(decryptedToken);
    if (tokenObj.creationDate < Date.now() - 1000 * 60 * this.configService.get('token_expiration_time_in_minutes')) {
      throw new Error('Token expired');
    }
    const [affectedCount] = await this.userModel.update({
      isEmailVerified: true,
      otpSecret: otpSecret,
      recoveryCode: randomBytes(32).toString('hex'),
    }, {
      where: {
        id: tokenObj.token
      }
    });
    const user = await this.userModel.findByPk(tokenObj.token)
    if (!user && affectedCount === 0 || user === null) {
      throw new Error('User not found');
    }
    return {
      user,
      keyUri: authenticator.keyuri(user.dataValues.email, "Parent Diary", otpSecret)
    };
  }
  /**
   * Get the OTP key URI for a user
   * @param userId - The ID of the user
   * @returns The OTP key URI
   */
  async getOtpKeyUri(userId: string): Promise<string> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return authenticator.keyuri(user.dataValues.email, "Parent Diary", user.dataValues.otpSecret);
  }
  /**
   * Reset the recovery code for a user
   * @param userId - The ID of the user
   * @returns The user
   */
  async resetRecoveryCode(userId: string): Promise<User> {
    const newRecoveryCode = randomBytes(32).toString('hex');
    await this.userModel.update({
      recoveryCode: newRecoveryCode
    }, {
      where: { id: userId }
    });
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
