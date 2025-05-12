import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { SignInDto } from './dto/sign-in.dto';
import { randomBytes } from 'crypto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() user: Omit<User, 'id'>): Promise<User> {
        return this.usersService.create(user);   
    }

    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto): Promise<User> {
        const salt: string = randomBytes(20).toString('hex');
        const user: Omit<User, 'id' | 'isEmailVerified'> = {
          ...signInDto,
          passwordHash: this.usersService.hashPassword(signInDto.password, salt),
          salt: salt,
          encryptedSecretKey: this.usersService.generateEncryptedSecretKey()
        } as unknown as Omit<User, 'id' | 'isEmailVerified'>;
        return this.usersService.create(user);   
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }

}
