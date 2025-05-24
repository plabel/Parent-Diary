import { Test, TestingModule } from '@nestjs/testing';
import { LogEntryService } from './log-entry.service';

describe('LogEntryService', () => {
  let service: LogEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogEntryService],
    }).compile();

    service = module.get<LogEntryService>(LogEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
