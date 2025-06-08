import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { sendConfirmationEmailTestCases } from './sendConfirmationEmail.fixtures';
import { sendPasswordResetEmailTestCases } from './sendPasswordResetEmail.fixtures';


describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, {
        provide: ConfigService,
        useValue: {
          get: jest.fn().mockReturnValue('1234567890_master_key'),
        },
      }],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.each(sendConfirmationEmailTestCases)('$description', async ({ to, token }) => {
    service.sendEmail = jest.fn();
    await service.sendConfirmationEmail(to, token);
    expect(service.sendEmail).toHaveBeenCalledWith(to, 'Confirm email', expect.any(String));
  });

  it.each(sendPasswordResetEmailTestCases)('$description', async ({ to, token }) => {
    service.sendEmail = jest.fn();
    await service.sendPasswordResetEmail(to, token);
    expect(service.sendEmail).toHaveBeenCalledWith(to, 'Reset password', expect.any(String));
  });
});
