
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { createHash, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import * as AES from 'crypto-js/aes';
import * as enc from 'crypto-js/enc-utf8';
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
    const secretKey = AES.decrypt(encryptedSecretKey, this.configService.get('master_key')).toString(enc.Utf8);
    return secretKey;
  }

  hashPassword(password: string, salt: string): string {
    const seasonedPassword = `${salt}${password}${this.configService.get('pepper')}`;
    return createHash('sha256').update(seasonedPassword).digest('hex');
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
