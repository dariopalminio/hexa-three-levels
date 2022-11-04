import { Module } from '@nestjs/common';
import { BusinessController } from 'src/test/app/controller/business.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessSchema } from 'src/test/infra/db/schema/mongo/business-model';
import { BusinessService } from 'src/test/domain/service/business.service';
import { BusinessRepository } from 'src/test/infra/db/repository/mongo/business.repository';
import { rootMongooseTestModule } from '../infra/db/mongo-connection-to-test';

@Module({
  imports: [
    rootMongooseTestModule(),
    MongooseModule.forFeature([
      { name: 'Business', schema: BusinessSchema },
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