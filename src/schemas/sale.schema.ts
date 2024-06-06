import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Capacity } from './capacity.schema';
import { Grade } from './grade.schema';
import { PaymentType } from './payment-type';
import { Accesories } from 'src/constant/accesories';
import { SaleStatus } from 'src/constant/sale';
import { IsEnum } from 'class-validator';
import { Product } from './product.schema';


@Schema()
export class User {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, required: true })
  lastName: string;

  @Prop({ trim: true, required: true })
  email: string;

  @Prop({ trim: true, required: true })
  phoneNumber: string;

  @Prop({ trim: true, required: false })
  ubigeo: string;

  @Prop({ trim: true, required: true })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema({ timestamps: true })
export class Sale {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false })
  productId: Product;


  @Prop({ required: true })
  productName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity', required: true })
  capacity: Capacity;

  @Prop({ type: [String], enum: Object.values(Accesories) })
  accesories: string[];

  @Prop({ trim: true, required: true })
  serieNumber: string;

  @Prop({ trim: true, required: true })
  firstImei: string;

  @Prop({ trim: true, required: true })
  secondImei: string;

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

  @Prop({ required: true })
  bankEntity: string;

  @Prop({ required: true })
  numberAccount: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
