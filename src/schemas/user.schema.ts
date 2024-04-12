import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Capacity } from './capacity.schema';
import { Color } from './color.schema';
import { Grade } from './grade.schema';
import { Product } from './product.schema';
import { PaymentType } from './payment-type';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, required: true })
  lastName: string;

  @Prop({ trim: true, required: true })
  email: string;

  @Prop({ trim: true, required: true })
  cellphone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DocumentType', required: true })
  documentType: DocumentType;

  @Prop({ trim: true, required: true })
  document: string;

  @Prop({ trim: true, required: true })
  department: string;

  @Prop({ trim: true, required: true })
  province: string;

  @Prop({ trim: true, required: true })
  district: string;

  @Prop({ trim: true, required: true })
  address: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
