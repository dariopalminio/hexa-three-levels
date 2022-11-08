import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business } from '../../../../domain/model/business/business';
import { BusinessEntityFactory } from '../../../../domain/model/business/business-entity.factory';
import { IRepository } from '../../../../../domain/outgoing/repository.interface';
import { BusinessDocument } from '../../schema/mongo/business-schema';
import { MongoGenericRepository } from '../../../../../infrastructure/db/repository/mongo/mongo-generic-repository';


/**
 * Category Mongo repository implementation
 * 
 * Note: This implementation works as an secondary adapter. 
 * There is an adapter layer that surrounds the application core. Adapters in this layer are not part of the core but interact with it.
 * The secondary adapters are called by the service (use cases). 
 */
@Injectable()
export class BusinessRepository extends MongoGenericRepository<BusinessDocument, Business> implements IRepository<Business> {

    constructor(
        @InjectModel('BusinessModel')
        businessModel: Model<BusinessDocument>,
    ) { 
        super(businessModel, new BusinessEntityFactory());
    }

}