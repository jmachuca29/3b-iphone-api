import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Capacity } from './capacity.schema';
import { Grade } from './grade.schema';
import { Product } from './product.schema';
import { PaymentType } from './payment-type';
import { Accesories } from 'src/constant/accesories';
import { SaleStatus } from 'src/constant/sale';

export type SaleDocument = HydratedDocument<Sale>;

@Schema()
export class Sale {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity', required: true })
  capacity: Capacity;

  @Prop({ enum: Accesories, required: true })
  accesories: string;

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

  @Prop({ required: true })
  battery: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: number;

  @Prop({ required: true })
  price: number;

  @Prop({ enum: SaleStatus })
  status: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
