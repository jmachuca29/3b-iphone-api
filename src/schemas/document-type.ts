import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<DocumentType>;

@Schema()
export class DocumentType {
  @Prop({ unique: true, trim: true, required: true })
  description: string;
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType);
