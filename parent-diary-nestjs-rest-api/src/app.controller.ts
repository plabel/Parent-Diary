import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private sequelize: Sequelize,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + this.configService.get('db.host');
  }
}
