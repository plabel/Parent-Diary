import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('/confirm-email (GET) bad token', () => {
    request(app.getHttpServer())
      .get('/users/confirm-email?token=badToken')
      .expect(500);   
  });

  it('/sign-in (POST) invalid body', () => {
    request(app.getHttpServer())
      .post('/users/sign-in')
      .send({
        email: 'test@test.com',
        firstName: 'test',
        lastName: 'test',
        password: ''
      })
      .expect(500);   
  });

  it('/sign-in (POST) and /log-in (POST)', async () => {
    const email = Date.now() + '.test@test.com';
    const response = await request(app.getHttpServer())
      .post('/users/sign-in')
      .send({
        email,
        firstName: 'test',
        lastName: 'test',
        password: 'Password123!'
      })
      .expect(201);
    expect(response.text).toBe("true");
    const responseLogin = await request(app.getHttpServer())
      .post('/users/log-in')
      .send({
        email,
        password: 'Password123!'
      })
      .expect(201);
    // false because the user has no yet confirmed his email
    expect(responseLogin.text).toBe("false");
  });

});
