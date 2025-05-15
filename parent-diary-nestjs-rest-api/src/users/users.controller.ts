import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { SignInDto } from './dto/sign-in.dto';
import { randomBytes } from 'crypto';
import { EmailService } from '../email/email.service';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly emailService: EmailService) {}

    @Get('confirm-email')
    confirmEmail(@Query('token') token: string): Promise<boolean> {
        return this.usersService.confirmEmail(token);
    }

    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto): Promise<boolean | void> {
        try {
            const salt: string = randomBytes(20).toString('hex');
            const user: Omit<User, 'id' | 'isEmailVerified'> = {
              ...signInDto,
              passwordHash: this.usersService.hashPassword(signInDto.password, salt),
              salt: salt,
              encryptedSecretKey: this.usersService.generateEncryptedSecretKey()
            } as unknown as Omit<User, 'id' | 'isEmailVerified'>;
            const createdUser = await this.usersService.create(user);
            await this.emailService.sendConfirmationEmail(createdUser.dataValues.email, `${createdUser.dataValues.id}`);
            return true;
        } catch (error) {
            switch (error.name) {
                case 'SequelizeUniqueConstraintError':
                    throw new HttpException({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Email already exists',
                        error: {
                            message: 'Email already exists',
                        },
                      }, HttpStatus.BAD_REQUEST, {
                        cause: error
                      });;
                default:
                    throw error;
            }
        }
    }

}
