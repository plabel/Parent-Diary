import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import * as enc from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';
import { User } from './user.model';
import { getModelToken } from '@nestjs/sequelize';
import { confirmEmailTestCases } from './confirmEmail.fixtures';

describe('UsersService', () => {
  let service: UsersService;
  const masterKey = '1234567890_master_key';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: ConfigService,
        useValue: {
          get: jest.fn().mockReturnValue(masterKey),
        },
      }, {
        provide: getModelToken(User),
        useValue: {
          create: jest.fn(),
          update: (_, {where}) => {
            if (where.id === '') return false;
            else return {
              id: where.id,
            };
          },
        },
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash password', () => {
    const password = 'password';
    const salt = 'salt';
    const hashedPassword = service.hashPassword(password, salt);
    expect(hashedPassword).toEqual('21719e826e1d860a3ed42a24817f241fc369a0e4602a602f53b7b04da397c1a8');
  });

  it('should decrypt generated secret key', () => {
    const encryptedSecretKey = service.generateEncryptedSecretKey();
    const decryptedSecretKey = service.decryptSecretKey(encryptedSecretKey)
    // Because the IV are different, we need to encrypt the decrypted secret key again to be able to make a comparison
    const encryptedSecretKey2 = AES.encrypt(decryptedSecretKey, masterKey).toString(enc.Utf8)
    const decryptedSecretKey2 = service.decryptSecretKey(encryptedSecretKey2)
    expect(decryptedSecretKey).toEqual(decryptedSecretKey2)
  });

  it.each(confirmEmailTestCases)('$description', async ({ token }) => {
    try {
      const result = await service.confirmEmail(token);
      expect(result).toEqual(true);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });

});
