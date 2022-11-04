import { Document,Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Business extends Document {

  constructor(key: string, values: any) {
    super();
    this.key = key;
    this.values = values;
  }


  @Prop()
  key: string;

  @Prop({ type: Types.Map })
  values: any;

}

export const BusinessSchema = SchemaFactory.createForClass(Business);
