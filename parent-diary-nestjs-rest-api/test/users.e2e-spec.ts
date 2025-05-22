import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import * as session from 'express-session';
import { randomBytes } from 'crypto';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;
  const secret = randomBytes(20).toString('hex');

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(
      session({
        secret,
        resave: false,
        saveUninitialized: false,
      }),
    );
    await app.init();
  });


  it('/confirm-email (GET) bad token', async () => {
    await request(app.getHttpServer())
      .get('/users/confirm-email?token=badToken')
      .expect(500);   
  });

  it('/sign-in (POST) invalid body', async () => {
    await request(app.getHttpServer())
      .post('/users/sign-in')
      .send({
        email: 'test',
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

  it(`
      /send-reset-password-email (POST) and then /reset-password (POST)
    `, async () => {
    const email = 'example@example.com';
    // Create a reusable agent that maintains cookies between requests
    const agent = request.agent(app.getHttpServer());
    const spy = jest.spyOn(global, 'encodeURIComponent')

    const responseSendResetPasswordEmail = await agent
      .post(`/users/send-reset-password-email?email=${email}`)
      .expect(201);
    expect(responseSendResetPasswordEmail.text).toBe("true");
    const token = spy.mock.lastCall?.[0] ?? "";
    const responseResetPassword = await agent
      .post('/users/reset-password')
      .send({
        token: token,
        password: 'Password1234'
      })
      .expect(201);
    expect(responseResetPassword.text).toBe("true");
  });

  it(`
      /log-in (POST) and then /delete (DELETE) user
    `, async () => {
    const email = 'example2@example.com';
        
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

    const responseDeleteUser = await agent
      .delete('/users/current-user')
      .expect(200);
    expect(responseDeleteUser.text).toBe("true");
  });

});
