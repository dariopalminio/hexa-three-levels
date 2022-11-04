import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business } from 'src/infra/database/schema/business-model';


@Injectable()
export class BusinessService {

  constructor(
    @InjectModel('Business') 
    private appVariableModel: Model<Business>,
  ) {
  }

  async createVaiable(key: string, values: any): Promise<any> {
    return this.appVariableModel.create({ key,values });
  }

  async getBusiness(key: string): Promise<Business> {
    return await this.appVariableModel.findOne({key: key}).exec();
  }

   getHello(): string {
    return 'Hello World!' ;
  }

}
