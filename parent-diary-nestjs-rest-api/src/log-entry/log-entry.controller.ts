import { Controller, Get, Query, Req, UseGuards, Delete, Param, Post, Body, Patch } from '@nestjs/common';
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

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteLogEntry(@Param('id') id: string, @Req() request: Request & { session: { userId: string }}): Promise<boolean> {
        const userId = (request.session as any).userId;
        return this.logEntryService.deleteLogEntry(parseInt(id), userId);
    }

    @Post()
    @UseGuards(AuthGuard)
    createLogEntry(@Body() logEntry: LogEntry, @Req() request: Request & { session: { userId: string }}): Promise<LogEntry | null> {
        const userId = (request.session as any).userId;
        return this.logEntryService.createLogEntry({...logEntry, userId});
    }
    @Patch(':id')
    @UseGuards(AuthGuard)
    updateLogEntry(@Param('id') id: string, @Body() logEntry: LogEntry, @Req() request: Request & { session: { userId: string }}): Promise<LogEntry | null> {
        const userId = (request.session as any).userId;
        return this.logEntryService.updateLogEntry(parseInt(id), logEntry, userId);
    }
}
