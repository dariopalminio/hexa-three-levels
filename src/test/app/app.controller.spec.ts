import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from '../../app/controller/business.controller';
import { BusinessService } from '../../domain/business.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessSchema } from '../../infra/database/schema/business-model';
import { rootMongooseTestModule, closeInMongodConnection } from '../infra/database/mongo-connection-to-test';

describe('AppController', () => {
  let businessController: BusinessController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Business', schema: BusinessSchema },
        ])
      ],
      controllers: [BusinessController],
      providers: [BusinessService],
    }).compile();

    businessController = app.get<BusinessController>(BusinessController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(businessController.getHello()).toBe('Hello World!');
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

});
