import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  StreamableFile,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { SignInDto } from './dto/sign-in.dto';
import { randomBytes } from 'crypto';
import { EmailService } from '../email/email.service';
import { LogInDto } from './dto/log-in.dto';
import { Request, Response } from 'express';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { LogEntryService } from '../log-entry/log-entry.service';
import { FamilyMemberService } from '../family-member/family-member.service';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { join } from 'path';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly logEntryService: LogEntryService,
    private readonly familyMemberService: FamilyMemberService,
  ) {}

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string): Promise<string> {
    const { keyUri, user } = await this.usersService.confirmEmail(token);
    await this.emailService.sendRecoveryCodeEmail(
      user.dataValues.email,
      user.dataValues.recoveryCode,
    );
    return keyUri;
  }
  @Get('current-user')
  getCurrentUser(
    @Req() request: Request & { session: { userId: string } },
  ): unknown | null {
    return !!request?.session?.userId
      ? {
          userId: request.session.userId,
        }
      : null;
  }
  @Get('data-dump')
  @SetMetadata('skipGlobalInterceptor', true)
  @Header('Content-Disposition', 'attachment; filename="data-dump.json.txt"')
  async getDataDump(
    @Req() request: Request & { session: { userId: string } },
  ): Promise<StreamableFile> {
    const data = {
      user: await this.usersService.getUserById(request.session.userId),
      logEntries: await this.logEntryService.getAllLogEntries(
        parseInt(request.session.userId),
      ),
      familyMembers: await this.familyMemberService.getFamilyMembers(
        parseInt(request.session.userId),
      ),
    };

    // Create buffer from JSON data
    const buffer = Buffer.from(JSON.stringify(data, null, 2));

    return new StreamableFile(buffer);
  }
  @Get('otp-key-uri')
  async getOtpKeyUri(
    @Req() request: Request & { session: { userId: string } },
  ): Promise<string | null> {
    return !!request?.session?.userId
      ? this.usersService.getOtpKeyUri(request.session.userId)
      : null;
  }
  @Delete('current-user')
  async deleteUser(
    @Req() request: Request & { session: { userId: string } },
  ): Promise<boolean | void> {
    const userId = (request.session as any).userId;
    if (!userId) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const result = await this.usersService.delete(userId);
    (request.session as any).userId = null;
    return result;
  }
  @Post('log-in')
  async logIn(
    @Body() logInDto: LogInDto,
    @Req() request: Request,
  ): Promise<boolean | void> {
    const user = await this.usersService.logIn(logInDto);
    if (user) {
      (request.session as any).userId = user.dataValues.id;
      return true;
    }
    return false;
  }
  @Post('log-out')
  async logOut(@Req() request: Request): Promise<boolean | void> {
    (request.session as any).userId = null;
    return true;
  }
  @Post('reset-recovery-code')
  async resetRecoveryCode(@Req() request: Request): Promise<boolean | void> {
    const userId = (request.session as any).userId;
    if (!userId) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.usersService.resetRecoveryCode(userId);
    await this.emailService.sendRecoveryCodeEmail(
      user.dataValues.email,
      user.dataValues.recoveryCode,
    );
    return true;
  }
  @Post('send-reset-password-email')
  async sendResetPasswordEmail(
    @Query('email') email: string,
  ): Promise<boolean | void> {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      await this.emailService.sendPasswordResetEmail(
        user.dataValues.email,
        user.dataValues.id + '',
      );
    }
    return true;
  }
  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<boolean> {
    return this.usersService.resetPassword(token, resetPasswordDto.password);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<boolean | void> {
    try {
      const salt: string = randomBytes(20).toString('hex');
      const user: Omit<User, 'id' | 'isEmailVerified'> = {
        ...signInDto,
        passwordHash: this.usersService.hashPassword(signInDto.password, salt),
        salt: salt,
        encryptedSecretKey: this.usersService.generateEncryptedSecretKey(),
      } as unknown as Omit<User, 'id' | 'isEmailVerified'>;
      const createdUser = await this.usersService.create(user);
      await this.emailService.sendConfirmationEmail(
        createdUser.dataValues.email,
        `${createdUser.dataValues.id}`,
      );
      return true;
    } catch (error) {
      switch (error.name) {
        case 'SequelizeUniqueConstraintError':
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Email already exists',
              error: {
                message: 'Email already exists',
              },
            },
            HttpStatus.BAD_REQUEST,
            {
              cause: error,
            },
          );
        default:
          throw error;
      }
    }
  }
}
