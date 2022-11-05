import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../../infra/db/mongo-connection-to-test';
import { BusinessService } from '../../domain/service/business.service';
import { BusinessRepository } from '../../infra/db/repository/mongo/business.repository';
import { Business } from '../model/business/business';
import { IBusinessService } from '../incomming/business-service.interface';
import { BusinessSchema } from '../../infra/db/schema/mongo/business-schema';

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

    it('should return entity created', async () => {
      const dto = {
        "key": "colocolo",
        "meta": {
          "nickName": "colocolo"
        }
      };
      const entity: Business = new Business(dto);
      const entityCreated: Business = await businessService.create(entity);
      expect(entityCreated.key).toBe(dto.key);
    });
  });

  describe('businessService.updateById', () => {

    it('should create, edit (using updateById method) and return entity updated', async () => {
      const dto = {
        "key": "name",
        "meta": {
          "nickName": "daro"
        }
      };
      const entity: Business = new Business(dto);
      let entityCreated: Business = await businessService.create(entity);
      expect(entityCreated).toBeInstanceOf(Business);
      entityCreated.setMeta({ nickName: "andres" })
      const id: string = entityCreated.getId();
      const updated: boolean = await businessService.updateById(id, entityCreated);
      expect(updated).toBe(true);
      const entityUpdated: Business = await businessService.getById(id);
      expect(entityUpdated.getMeta().nickName).toBe("andres");

    });
  });

  describe('businessService.update', () => {

    it('should create, edit  (using update method) and return entity updated', async () => {
      const dto = {
        "key": "toy",
        "meta": {
          "nickName": "apple",
          "document": "27000111-9"
        }
      };
      const entity: Business = new Business(dto);
      let entityCreated: Business = await businessService.create(entity);
      expect(entityCreated).toBeInstanceOf(Business);
      entityCreated.setMeta({ nickName: "andres" })
      const id: string = entityCreated.getId();
      const updated: boolean = await businessService.update({ "key": "toy" }, {
        "meta": {
          "nickName": "apple changed",
          "document": "changed"
        }
      });
      expect(updated).toBe(true);
      const entityUpdated: Business = await businessService.getById(id);
      expect(entityUpdated.getMeta().nickName).toBe("apple changed");

    });
  });

  describe('businessService.getByQueryExcludingFields', () => {

    it('getByQueryExcludingFields should return the result of a search excluding fields', async () => {
      const dto1 = {
        "key": "key1",
        "meta": {
          "nickName": "nickName1",
          "document": "document1"
        }
      };
      const dto2 = {
        "key": "key2",
        "meta": {
          "nickName": "nickName2",
          "document": "document2"
        }
      };
      const entity1: Business = new Business(dto1);
      const entity2: Business = new Business(dto2);
      await businessService.create(entity1);
      let entityCreated2: Business = await businessService.create(entity2);
      const query: any = { "key": "key2" }; //to search
      const toExclude: any = { "meta": 0 };
      const entityFound: any = await businessService.getByQueryExcludingFields(query, toExclude);
      expect(entityFound.key).toBe("key2");
      expect(entityFound.id).toBe(entityCreated2.getId());
      expect(entityFound.meta).toBeUndefined();
    });
  });


  afterAll(async () => {
    await closeInMongodConnection();
  });

});
