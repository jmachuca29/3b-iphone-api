import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Color>;

@Schema()
export class Color {
  @Prop({ unique: true, trim: true, required: true })
  description: string;

  @Prop({ trim: true, required: false })
  code: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
