import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LogEntry } from './log-entry.model';

@Injectable()
export class LogEntryService {
    constructor(
        @InjectModel(LogEntry)
        private logEntryModel: typeof LogEntry,
      ) {}

      async createLogEntry(logEntry: Partial<LogEntry>): Promise<LogEntry> {
        return this.logEntryModel.create(logEntry);
      }

      async getLogEntries(userId: number, page: number): Promise<LogEntry[]> {
        const limit = 10;
        const offset = (page - 1) * limit;
        return this.logEntryModel.findAll({ where: { userId }, limit, offset });
      } 

      async deleteLogEntry(id: number, userId: number): Promise<boolean> {
        const result = await this.logEntryModel.destroy({ where: { id, userId } });
        return result === 1;
      }
      
}
