import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { UsersService } from './users.service';
import { User } from './user.model';
import { getModelToken } from '@nestjs/sequelize';
import { AppModule } from '../app.module';
import { LogEntryModule } from '../log-entry/log-entry.module';
import { LogEntryService } from '../log-entry/log-entry.service';
import { FamilyMemberLogEntries, LogEntry } from '../log-entry/log-entry.model';
import { FamilyMemberService } from '../family-member/family-member.service';
import { FamilyMember } from '../family-member/family-member.model';
describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, LogEntryModule],
      controllers: [UsersController],
      providers: [
        ConfigService,
        EmailService,
        UsersService,
        LogEntryService,
        FamilyMemberService,
        {
          provide: getModelToken(User),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(LogEntry),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(FamilyMemberLogEntries),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(FamilyMember),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
