import { Test, TestingModule } from '@nestjs/testing';
import { LogEntryController } from './log-entry.controller';
import { LogEntryModule } from './log-entry.module';
import { FamilyMemberModule } from '../family-member/family-member.module';
import { LogEntryService } from './log-entry.service';
import { getModelToken } from '@nestjs/sequelize';
import { FamilyMemberLogEntries, LogEntry } from './log-entry.model';
import { AppModule } from '../app.module';

describe('LogEntryController', () => {
  let controller: LogEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, LogEntryModule, FamilyMemberModule],
      controllers: [LogEntryController],
      providers: [
        LogEntryService,
        {
          provide: getModelToken(LogEntry),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getModelToken(FamilyMemberLogEntries),
          useValue: {
            create: jest.fn(),
          },
        }],
    }).compile();

    controller = module.get<LogEntryController>(LogEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
