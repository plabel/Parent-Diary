import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import * as enc from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';
import { User } from './user.model';
import { getModelToken } from '@nestjs/sequelize';
import { confirmEmailTestCases } from './confirmEmail.fixtures';
import { loginTestCases } from './login.fixtures';
import { resetRecoveryCodeTestCases } from './resetRecoveryCode.fixtures';
jest.mock('otplib', () => ({
  authenticator: {
    verify: jest.fn().mockReturnValue(true),
    generateSecret: jest.fn().mockReturnValue('123456'),
    generate: jest.fn().mockReturnValue('123456'),
    keyuri: jest.fn().mockReturnValue('123456'),
  },
}));

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;
  const masterKey = '1234567890_master_key';

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(masterKey),
          },
        },
        {
          provide: getModelToken(User),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findByPk: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
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
    expect(hashedPassword).toEqual(
      '21719e826e1d860a3ed42a24817f241fc369a0e4602a602f53b7b04da397c1a8',
    );
  });

  it('should decrypt generated secret key', () => {
    const encryptedSecretKey = service.generateEncryptedSecretKey();
    const decryptedSecretKey = service.decryptSecretKey(encryptedSecretKey);
    // Because the IV are different, we need to encrypt the decrypted secret key again to be able to make a comparison
    const encryptedSecretKey2 = AES.encrypt(
      decryptedSecretKey,
      masterKey,
    ).toString(enc.Utf8);
    const decryptedSecretKey2 = service.decryptSecretKey(encryptedSecretKey2);
    expect(decryptedSecretKey).toEqual(decryptedSecretKey2);
  });

  it.each(confirmEmailTestCases)(
    '$description',
    async ({ token, findByPkResolvedValue: findByPkResolvedValue, expectedResult }) => {
      try {
        jest
          .spyOn(module.get(getModelToken(User)), 'findByPk')
          .mockResolvedValue(findByPkResolvedValue);
        jest
          .spyOn(module.get(getModelToken(User)), 'update')
          .mockResolvedValue([1]);
        jest.spyOn(global.JSON, 'parse').mockReturnValue({
          token: '1234567890',
          creationDate: Date.now(),
        });
        const result = await service.confirmEmail(token);
        expect(result).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(new Error('User not found'));
      }
    },
  );

  it.each(loginTestCases)(
    '$description',
    async ({ logInDto, findOneResolvedValue, expectedResult }) => {
      jest
        .spyOn(module.get(getModelToken(User)), 'findOne')
        .mockResolvedValue(findOneResolvedValue);
      const result = await service.logIn(logInDto);
      expect(result).toEqual(expectedResult);
    },
  );
  it.each(resetRecoveryCodeTestCases)(
    '$description',
    async ({ userId, findByPkResolvedValue, expectedResult, expectedError }) => {
      try {
        jest
          .spyOn(module.get(getModelToken(User)), 'update')
          .mockResolvedValue([1]);
        jest
          .spyOn(module.get(getModelToken(User)), 'findByPk')
          .mockResolvedValue(findByPkResolvedValue);
        const result = await service.resetRecoveryCode(userId);
        expect(result).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    },
  );
});
