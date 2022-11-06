import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../../infra/db/mongo-connection-to-test';
import { BusinessService } from '../../domain/service/business.service';
import { BusinessRepository } from '../../infra/db/repository/mongo/business.repository';
import { Business } from '../model/business/business';
import { IBusinessService } from '../incomming/business-service.interface';
import { BusinessSchema } from '../../infra/db/schema/mongo/business-schema';

describe('Integration test: test GenericService & MongoGenericRepository through businessService', () => {
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

  describe('Generic Service, create method', () => {

    it('should return entity created (positive)', async () => {
      const dto = {
        "key": "colocolo",
        "meta": { "nickName": "colocolo" }
      };
      const entity: Business = new Business(dto);
      const entityCreated: Business = await businessService.create(entity);
      expect(entityCreated.key).toBe(dto.key);
    });
  });

  describe('Generic Service, updateById method', () => {

    it('should create, edit (using updateById method) and return entity updated (positive)', async () => {
      const dto = {
        "key": "name",
        "meta": { "nickName": "daro" }
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

  describe('Generic Service, update method', () => {

    it('should create, edit  (using update method) and return entity updated (positive)', async () => {
      const dto = {
        "key": "toy",
        "meta": { "nickName": "apple", "document": "27000111-9" }
      };
      const entity: Business = new Business(dto);
      let entityCreated: Business = await businessService.create(entity);
      expect(entityCreated).toBeInstanceOf(Business);
      entityCreated.setMeta({ nickName: "andres" })
      const id: string = entityCreated.getId();
      const updated: boolean = await businessService.update({ "key": "toy" }, {
        "meta": { "nickName": "apple changed", "document": "changed" }
      });
      expect(updated).toBe(true);
      const entityUpdated: Business = await businessService.getById(id);
      expect(entityUpdated.getMeta().nickName).toBe("apple changed");

    });
  });

  describe('Generic Service, getByQueryExcludingFields method', () => {

    it('getByQueryExcludingFields should return the result of a search excluding fields (positive)', async () => {
      const dto1 = {
        "key": "key1",
        "meta": {
          "nickName": "nickName1", "document": "document1"
        }
      };
      const dto2 = {
        "key": "key2",
        "meta": {
          "nickName": "nickName2", "document": "document2"
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

  describe('Generic Service, findExcludingFields method', () => {

    it('findExcludingFields should return an array containing 5 unmarshalled elements with id field typeof string (positive)', async () => {
      const dto = {
        "key": "key",
        "meta": { "nickName": "nickName" }
      };

      //add 10 entities in database
      for (let i = 0; i < 10; i++) {
        let unmarshalled = dto;
        unmarshalled.key = "key" + i;
        if ((i % 2) == 0) {
          unmarshalled = {
            ...dto, meta: {
              nickName: "objective"
            }
          };
        }
        const entity: Business = new Business(unmarshalled);
        await businessService.create(entity);
      }

      //find result using query filter and excluding fields
      const fieldsToExclude = {
        key: 0 //exclude this field
      };

      const queryFuilter = {
        "meta": { "nickName": "objective" }
      };
      const page = 1, limit = 5, orderByField = "meta", isAscending = true;
      const result: any[] = await businessService.findExcludingFields(queryFuilter, fieldsToExclude, page, limit, orderByField, isAscending);

      expect(result).toBeDefined();
      expect(result.length).toBe(5);
      expect(result[0].meta.nickName).toBe("objective");
      expect(result[0].id).toBeDefined();
      expect(typeof result[0].id).toEqual('string');

    });
  });

  describe('Generic Service, getAll method', () => {

    it('getAll should return an array containing entity elements instanceOf Entity (positive)', async () => {
      const dto = {
        "key": "key",
        "meta": { "nickName": "nickName" }
      };

      //add 10 entities in database
      for (let i = 0; i < 10; i++) {
        let unmarshalled = dto;
        unmarshalled.key = "key" + i;
        const entity: Business = new Business(unmarshalled);
        await businessService.create(entity);
      }

      //get all 
      const result: Business[] = await businessService.getAll();

      expect(result).toBeDefined();
      expect(result.length).toBe(10);
      expect(result[0]).toBeInstanceOf(Business);
      expect(typeof result[0].getId()).toEqual('string');
    });
  });

  describe('Generic Service, delete method', () => {

    it('delete should return true and the entity must have been deleted in the database (positive)', async () => {
      const dto = {
        "key": "turing",
        "meta": { "nickName": "tu" }
      };
      const entity: Business = new Business(dto);
      const entityCreated: Business = await businessService.create(entity);
      expect(entityCreated.key).toBe(dto.key);
      const id: string = entityCreated.getId();
      const deleted: boolean = await businessService.delete(id);
      expect(deleted).toBe(true);
      let found: boolean = false;
      try {
        const entityFound: Business = await businessService.getById(id);
        if (entityFound) {
          found = true;
        }
      } catch (err) {
        found = false; //not found was deleted
      }
      expect(found).toBe(false);
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

});
