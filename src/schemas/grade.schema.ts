import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Grade>;

@Schema()
export class Grade {
  @Prop({ unique: true, trim: true, required: true })
  description: string;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
