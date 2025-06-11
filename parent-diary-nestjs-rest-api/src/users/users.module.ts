import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { LogEntryService } from '../log-entry/log-entry.service';
import { FamilyMemberService } from '../family-member/family-member.service';
import { LogEntry, FamilyMemberLogEntries } from '../log-entry/log-entry.model';
import { FamilyMember } from '../family-member/family-member.model';
@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      LogEntry,
      FamilyMemberLogEntries,
      FamilyMember,
    ]),
    ConfigModule,
  ],
  providers: [
    UsersService,
    ConfigService,
    EmailService,
    LogEntryService,
    FamilyMemberService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
