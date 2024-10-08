import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Capacity } from './capacity.schema';
import { Grade } from './grade.schema';
import { PaymentType } from './payment-type';
import { DocumentType } from './document-type';
import { SaleStatus } from 'src/constant/sale';
import { Product } from './product.schema';
import { User as UserExternal } from './user.schema';
import sequenceGenerator from 'src/utils/correlative';
import { Color } from './color.schema';

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

@Schema({ timestamps: true })
export class Sale {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: false })
  userId: UserExternal;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: false })
  productId: Product;

  @Prop({ required: true })
  productName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Capacity', required: true })
  capacity: Capacity;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Color', required: true })
  color: Color;

  @Prop({ required: true })
  originalBox: boolean;

  @Prop({ trim: true, required: true })
  serieNumber: string;

  @Prop({ trim: true, required: true })
  firstImei: string;

  @Prop({ trim: true, required: true })
  secondImei: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PaymentType', required: true })
  paymentType: PaymentType;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Grade', required: true })
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

  @Prop()
  createdAt: string;

  @Prop()
  correlative: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'DocumentType', required: true })
  documentType: DocumentType;

  @Prop({ required: true })
  documentNumber: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

export const configureSaleSchema = (connection: Connection) => {
  const AutoIncrement = sequenceGenerator(connection);
  SaleSchema.plugin(AutoIncrement, { inc_field: 'correlative', id: 'sale_sequence' });
};
