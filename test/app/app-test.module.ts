import { Module } from '@nestjs/common';
import { BusinessController } from './controller/business.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessSchema } from '../infra/db/schema/mongo/business-schema';
import { BusinessService } from '../domain/service/business.service';
import { BusinessRepository } from '../infra/db/repository/mongo/business.repository';
import { rootMongooseTestModule } from '../infra/db/mongo-connection-to-test';

@Module({
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
})
export class AppTestModule {}