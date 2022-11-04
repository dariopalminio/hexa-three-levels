import { Module } from '@nestjs/common';
import { BusinessController } from './controller/business.controller';
import { BusinessService } from '../domain/business.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessSchema } from 'src/infra/db/schema/mongo/business-model';
import DB_CONNECTION from 'src/infra/db/mongo-db-connection';

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([
      { name: 'Business', schema: BusinessSchema },
    ])
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class AppModule {}
