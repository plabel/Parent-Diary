import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { LogEntryService } from './log-entry/log-entry.service';
import configuration from './config/config';
import { LogEntryController } from './log-entry/log-entry.controller';
import { LogEntryModule } from './log-entry/log-entry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    LogEntryModule,
  ],
  controllers: [AppController ],
  providers: [AppService, EmailService],
})
export class AppModule {}
