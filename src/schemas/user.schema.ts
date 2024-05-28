import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { DocumentType } from './document-type';

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
  documentNumber: string;

  @Prop({ trim: true, required: true})
  ubigeo: string;

  @Prop({ trim: true, required: true })
  address: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
