import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Capacity } from './capacity.schema';
import { Grade } from './grade.schema';
import { Product } from './product.schema';
import { PaymentType } from './payment-type';
import { Accesories } from 'src/constant/accesories';
import { SaleStatus } from 'src/constant/sale';



@Schema()
export class User {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, required: true })
  last_name: string;

  @Prop({ trim: true, required: true })
  email: string;

  @Prop({ trim: true, required: true })
  cellphone: string;

  @Prop({ trim: true, required: true })
  ubigeo: string;

  @Prop({ trim: true, required: true })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ timestamps: true })
export class Sale {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity', required: true })
  capacity: Capacity;

  @Prop({ required: true })
  accesories: string[];

  @Prop({ trim: true, required: true })
  serieNumber: string;

  @Prop({ trim: true, required: true })
  imei_1: string;

  @Prop({ trim: true, required: true })
  imei_2: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentType', required: true })
  paymentType: PaymentType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true })
  grade: Grade;

  @Prop({ type: UserSchema, required: true })
  user: User;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  uuid: string;

  @Prop({ enum: SaleStatus, default: SaleStatus.Pending })
  status: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
