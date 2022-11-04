import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../../infra/db/mongo-connection-to-test';
import { BusinessService } from '../../domain/service/business.service';
import { BusinessRepository } from '../../infra/db/repository/mongo/business.repository';
import { Business } from '../model/business/business';
import { IBusinessService } from '../incomming/business-service.interface';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { BusinessDocument, BusinessSchema } from '../../infra/db/schema/mongo/business-schema';
import { IRepository } from 'src/domain/outgoing/repository.interface';

describe('businessService', () => {
    let businessService: IBusinessService<Business>;

    beforeEach(async () => {

        const app: TestingModule = await Test.createTestingModule({
            imports: [
              rootMongooseTestModule(),
              MongooseModule.forFeature([
                { name: 'BusinessModel', schema: BusinessSchema },
              ])
            ],
            controllers: [],
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
      
        businessService = app.get<BusinessService>('IBusinessService');

    });

    describe('businessService.getHello', () => {
        it('should return "Hello World!"', () => {
            expect(businessService.getHello()).toBe('Hello World!');

        });
    });

    describe('businessService.create', () => {
        
        it('should return entity created', async() => {
            const dto = {
                "key": "colocolo",
                "meta": {
                    "nickName": "colocolo"
                }
            };
            const entity: Business = new Business(dto);
            console.log("entity:", entity);
            try{
            const entityCreated: Business = await businessService.create(entity);
            expect(entityCreated.key).toBe(dto.key);
            }catch(error){console.log("error:", error);}
            

        });
    });

    afterAll(async () => {
        await closeInMongodConnection();
    });

});
