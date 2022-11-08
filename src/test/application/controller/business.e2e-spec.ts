import { Test, TestingModule } from '@nestjs/testing';
import { HttpServer, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppTestModule } from '../app-test.module';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // Reference the server instance
    httpServer = app.getHttpServer()
  });

  it('/ (GET)', () => {
    return request(httpServer)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  /**
   * Scenario: create an item and then request it using a field
   * /create (POST)
   * /key/:key (GET)
   */
  it('Scenario: create an item and then request it using a field', async () => {

    const createDTO = {
      "key": "business",
      "meta": {
        "nickName": "Pepe S.A."
      }
    }

    const response1 = await request(httpServer)
      .post('/create')
      .send(createDTO);

    //Test --> @Post('create')
    expect(response1.status).toBe(200);
    expect(response1.body.business.key).toBe(createDTO.key);
    expect(response1.body.business.meta.nickName).toBe(createDTO.meta.nickName);

    //Test --> @Get('/key/:key')
    const response2 = await request(httpServer)
      .get('/key/business');
    expect(response2.status).toBe(200);
    expect(response2.body.meta.nickName).toBe(createDTO.meta.nickName);
  });

  /**
  * Scenario: create an element and then request it by if id
  * /create (POST) 
  * /id/:BusinessID (GET)
  */
  it('Scenario: create an element and then request it by if id', async () => {

    const createDTO = {
      "key": "email",
      "meta": {
        "email": "daro@gmail.com"
      }
    }

    const response1 = await request(httpServer)
      .post('/create')
      .send(createDTO);

    //Test --> @Post('create')
    expect(response1.status).toBe(200);
    expect(response1.body.business.key).toBe(createDTO.key);
    expect(response1.body.business.meta.email).toBe(createDTO.meta.email);

    //Test --> @Get('/id/:BusinessID')
    const businessID = response1.body.business.id;
    const response2 = await request(httpServer)
      .get('/id/' + businessID);
    expect(response2.status).toBe(200);
    expect(response2.body.key).toBe(createDTO.key);
    expect(response2.body.meta.email).toBe(createDTO.meta.email);

  });

  afterEach(async () => {
    app.close();
    httpServer.close();
  });



});
