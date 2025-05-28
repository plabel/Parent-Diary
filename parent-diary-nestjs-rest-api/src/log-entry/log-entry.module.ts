import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { LogEntryController } from './log-entry.controller';
import { LogEntryService } from './log-entry.service';
import { ConfigService } from '@nestjs/config';
import { LogEntry, FamilyMemberLogEntries } from './log-entry.model';

@Module({
    imports: [SequelizeModule.forFeature([LogEntry, FamilyMemberLogEntries]), ConfigModule],
    providers: [LogEntryService, ConfigService],
    controllers: [LogEntryController],
})
export class LogEntryModule {}
