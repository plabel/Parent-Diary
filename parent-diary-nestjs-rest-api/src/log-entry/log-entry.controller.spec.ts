import { Test, TestingModule } from '@nestjs/testing';
import { LogEntryController } from './log-entry.controller';

describe('LogEntryController', () => {
  let controller: LogEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogEntryController],
    }).compile();

    controller = module.get<LogEntryController>(LogEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
