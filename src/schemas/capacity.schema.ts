import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Capacity>;

@Schema()
export class Capacity {
  @Prop({ unique: true, trim: true, required: true })
  description: string;
}

export const CapacitySchema = SchemaFactory.createForClass(Capacity);
