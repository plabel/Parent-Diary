import { Test, TestingModule } from '@nestjs/testing';
import { LogEntryService } from './log-entry.service';
import { FamilyMemberLogEntries, LogEntry } from './log-entry.model';
import { getModelToken } from '@nestjs/sequelize';
describe('LogEntryService', () => {
  let service: LogEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogEntryService,
        {
          provide: getModelToken(LogEntry),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },{
          provide: getModelToken(FamilyMemberLogEntries),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        }],
    }).compile();

    service = module.get<LogEntryService>(LogEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
