import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import * as session from 'express-session';
import { randomBytes } from 'crypto';
describe('Family Member (e2e)', () => {
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

  it('CRUD family members', async () => {
    const agent = request.agent(app.getHttpServer());
    // log in
    const loginResponse: { res: { text: string } } = (await agent
      .post('/users/log-in')
      .send({
        email: 'example@example.com',
        password: 'Password1234',
        recoveryCode:
          '12f552ceac29732fea6d716538c68719ec9afbfe63e86ceab6e59824c2e77fad',
      })
      .expect(201)) as unknown as { res: { text: string } };
    expect(loginResponse.res.text).toBe('true');

    // read family members
    const response = await agent
      .get('/family-member')
      .withCredentials()
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);

    // create family member
    const createResponse = await agent
      .post('/family-member')
      .withCredentials()
      .send({
        name: 'John Doe',
        age: 30,
        gender: 'male',
      })
      .expect(201);
    expect(createResponse.body).toBeInstanceOf(Object);

    // update family member
    const updateResponse = await agent
      .patch(`/family-member/${createResponse.body.id}`)
      .withCredentials()
      .send({
        name: 'John Doe updated',
      })
      .expect(200);
    expect(updateResponse.body).toBeInstanceOf(Object);

    // delete family member
    const deleteResponse = await agent
      .delete(`/family-member/${createResponse.body.id}`)
      .withCredentials()
      .expect(200);
    expect(deleteResponse.text).toBe('true');
  });
});
