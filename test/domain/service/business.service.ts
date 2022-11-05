import { Injectable, Inject } from '@nestjs/common';
import { IRepository } from 'src/domain/outgoing/repository.interface';
import { IBusinessService } from '../incomming/business-service.interface';
import { Business } from '../model/business/business';
import { BusinessEntityFactory } from '../model/business/business-entity.factory';
import { IBusiness } from '../model/business/business.interface';
import { GenericService } from 'src/domain/service/generic.service';

/**
 * Category Service
 * 
 * The Domain Service represents the main behavior associated with a main domain object (Entity root) 
 * and its collections, as in this case the 'Category' and Category collection.
 * 
 * Note: Service is where your business logic lives. This layer allows you to effectively decouple the processing logic from where the routes are defined.
 * The service provides access to the domain or business logic and uses the domain model to implement use cases. 
 * The service only accesses the database or external services through the infrastructure using interfaces.
 * A service is an orchestrator of domain objects to accomplish a goal.
 */
@Injectable()
export class BusinessService extends GenericService<IBusiness, Business> implements IBusinessService<Business> {

  constructor(
    @Inject('IBusinessRepository')
    businessRepository: IRepository<Business>,
  ) { 
    super(businessRepository, new BusinessEntityFactory());
  }

  getHello(): string {
    return 'Hello World!' ;
  };

  getByQueryExcludingFields(query: any, fieldsToExclude: any): Promise<any> {
    return this.repository.getByQueryExcludingFields(query,fieldsToExclude);
  }

};
