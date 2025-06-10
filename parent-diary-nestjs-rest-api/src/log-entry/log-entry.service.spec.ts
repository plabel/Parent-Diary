import { Test, TestingModule } from '@nestjs/testing';
import { LogEntryService } from './log-entry.service';
import { FamilyMemberLogEntries, LogEntry } from './log-entry.model';
import { getModelToken } from '@nestjs/sequelize';
import { createLogEntryTestCases } from './createLogEntry.fixtures';
import { getLogEntriesTestCases } from './getLogEntries.fixtures';
describe('LogEntryService', () => {
  let service: LogEntryService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [LogEntryService,
        {
          provide: getModelToken(LogEntry),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findByPk: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
          },
        },{
          provide: getModelToken(FamilyMemberLogEntries),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            bulkCreate: jest.fn(),
          },
        }],
    }).compile();

    service = module.get<LogEntryService>(LogEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createLogEntry', () => {
    it.each(createLogEntryTestCases)(
      '$description',
      async ({ fakeLogEntry, expectedResult, expectedError }) => {
        try {
          jest
            .spyOn(module.get(getModelToken(LogEntry)), 'create')
            .mockResolvedValue(fakeLogEntry);
          jest
            .spyOn(module.get(getModelToken(LogEntry)), 'findByPk')
            .mockResolvedValue(fakeLogEntry);
          const result = await service.createLogEntry(fakeLogEntry.dataValues);
          expect(result).toEqual(expectedResult);
        } catch (error) {
          expect(error).toEqual(expectedError);
        }
      },
    );
  });
  describe('getLogEntries', () => {
    it.each(getLogEntriesTestCases)(
      '$description',
      async ({ userId, page, search, sort, familyMembers, createdAfter, createdBefore, expectedResult, expectedError }) => {
        try {
          jest
            .spyOn(module.get(getModelToken(LogEntry)), 'findAll')
            .mockResolvedValue(expectedResult);
          const result = await service.getLogEntries(userId, page, search, sort, familyMembers, createdAfter, createdBefore);
          expect(result).toEqual(expectedResult);
        } catch (error) {
          expect(error).toEqual(expectedError);
        }
      },
    );
  });
});
