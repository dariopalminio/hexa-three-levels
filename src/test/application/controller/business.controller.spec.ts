import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from './business.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessSchema } from '../../infrastructure/db/schema/mongo/business-schema';
import { rootMongooseTestModule, closeInMongodConnection } from '../../infrastructure/db/mongo-connection-to-test';
import { BusinessService } from '../../domain/service/business.service';
import { BusinessRepository } from '../../infrastructure/db/repository/mongo/business.repository';

describe('BusinessController', () => {
  let businessController: BusinessController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'BusinessModel', schema: BusinessSchema },
        ])
      ],
      controllers: [BusinessController],
      providers: [
        {
          provide: 'IBusinessService',
          useClass: BusinessService,
        },
        {
          provide: 'IBusinessRepository',
          useClass: BusinessRepository,
        }
      ],
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
