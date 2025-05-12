import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
@Module({
  imports: [SequelizeModule.forFeature([User]), ConfigModule],
  providers: [UsersService, ConfigService, EmailService],
  controllers: [UsersController],
})
export class UsersModule {}
