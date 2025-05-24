import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LogEntryService } from './log-entry.service';
import { LogEntry } from './log-entry.model';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('log-entry')
export class LogEntryController {
    constructor(private readonly logEntryService: LogEntryService) {}

    @Get()
    @UseGuards(AuthGuard)
    getLogEntries(@Query('page') page: number): Promise<LogEntry[]> {
        const userId = 1;
        return this.logEntryService.getLogEntries(userId, page);
    }
}
