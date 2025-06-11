import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { FamilyMemberLogEntries, LogEntry } from '../log-entry/log-entry.model';
import { FamilyMember } from '../family-member/family-member.model';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        models: [User, LogEntry, FamilyMember, FamilyMemberLogEntries],
      }),
    }),
  ],
})
export class DatabaseModule {}
