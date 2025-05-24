import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { LogEntryService } from './log-entry.service';
import { LogEntry } from './log-entry.model';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('log-entry')
export class LogEntryController {
    constructor(private readonly logEntryService: LogEntryService) {}

    @Get()
    @UseGuards(AuthGuard)
    getLogEntries(@Query('page') page: number, @Req() request: Request & { session: { userId: string }}): Promise<LogEntry[]> {
        const userId = (request.session as any).userId;
        return this.logEntryService.getLogEntries(userId, page);
    }
}
