import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import * as session from 'express-session';
import { randomBytes } from 'crypto';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(
      session({
        secret: randomBytes(20).toString('hex'),
        resave: false,
        saveUninitialized: false,
      }),
    );
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

  it('/sign-in (POST) and /log-in (POST) fails because the user has not confirmed his email', async () => {
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

  it(`
      /log-in (POST) first the current user check (GET) is not null 
      and then the log-out (POST) is true
      and finally the current user check (GET) is null
    `, async () => {
    const email = 'example@example.com';
        
    // Create a reusable agent that maintains cookies between requests
    const agent = request.agent(app.getHttpServer());

    const responseLogin = await agent
      .post('/users/log-in')
      .send({
        email,
        password: 'Password1234'
      })
      .expect(201);
    expect(responseLogin.text).toBe("true");

    const responseCurrentUser = await agent
      .get('/users/current-user')
      .expect(200);
    expect(responseCurrentUser.text).not.toBe("");
    
    const responseLogOut = await agent
      .post('/users/log-out')
      .expect(201);
    expect(responseLogOut.text).toBe("true");

    const responseCurrentUserAfterLogOut = await agent
      .get('/users/current-user')
      .expect(200);
    expect(responseCurrentUserAfterLogOut.text).toBe("");
  });

});
