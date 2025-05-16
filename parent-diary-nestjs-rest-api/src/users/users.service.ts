
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { createHash, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import * as AES from 'crypto-js/aes';
import * as enc from 'crypto-js/enc-utf8';
import { LogInDto } from './dto/log-in.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  create(user: Omit<User, 'id' | 'isEmailVerified'>): Promise<User> {
    return this.userModel.create(user);
  }

  generateEncryptedSecretKey(): string {
    const secretKey = randomBytes(32).toString('hex');
    const encryptedSecretKey = AES.encrypt(secretKey, this.configService.get('master_key')).toString(enc.Utf8);
    return encryptedSecretKey;
  }
  decryptSecretKey(encryptedSecretKey: string): string {
    const secretKeyRaw = AES.decrypt(encryptedSecretKey, this.configService.get('master_key')).toString(enc.Utf8);
    return Buffer.from(secretKeyRaw, 'hex').toString();
  }

  hashPassword(password: string, salt: string): string {
    const seasonedPassword = `${salt}${password}${this.configService.get('pepper')}`;
    return createHash('sha256').update(seasonedPassword).digest('hex');
  }
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
    return user;
  }

  async confirmEmail(token: string): Promise<boolean> {
    const buffer = AES.decrypt(token, this.configService.get('master_key'));
    const decryptedToken = Buffer.from(buffer.toString(enc.Utf8), 'hex').toString();
    const user = await this.userModel.update({
      isEmailVerified: true
    }, {
      where: {
        id: decryptedToken
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return true;
  }
}
