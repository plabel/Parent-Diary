import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import * as session from 'express-session';
import { randomBytes } from 'crypto';
describe('Log Entry (e2e)', () => {
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

  it('CRUD log entries', async () => {
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

    // read log entries
    const response = await agent
      .get('/log-entry')
      .withCredentials()
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);

    // create log entry
    const createResponse = await agent
      .post('/log-entry')
      .withCredentials()
      .send({
        entry: 'This is a test log entry',
        familyMembers: [1, 2],
      })
      .expect(201);
    expect(createResponse.body).toBeInstanceOf(Object);
    expect(
      createResponse.body.familyMembers.map(
        (familyMember: { id: number }) => familyMember.id,
      ),
    ).toEqual([1, 2]);
    // update log entry
    const updateResponse = await agent
      .patch(`/log-entry/${createResponse.body.id}`)
      .withCredentials()
      .send({
        entry: 'This is a test log entry updated',
        familyMembers: [2],
      })
      .expect(200);
    expect(updateResponse.body).toBeInstanceOf(Object);
    expect(
      updateResponse.body.familyMembers.map(
        (familyMember: { id: number }) => familyMember.id,
      ),
    ).toEqual([2]);
    // delete log entry
    const deleteResponse = await agent
      .delete(`/log-entry/${createResponse.body.id}`)
      .withCredentials()
      .expect(200);
    expect(deleteResponse.text).toBe('true');
  });
});
