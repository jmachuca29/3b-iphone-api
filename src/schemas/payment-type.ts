import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<PaymentType>;

@Schema()
export class PaymentType {
  @Prop({ unique: true, trim: true, required: true })
  description: string;
}

export const PaymentTypeSchema = SchemaFactory.createForClass(PaymentType);
