import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {

  @Prop({ trim: true, required: true, unique: true })
  email: string;

  @Prop({ trim: true, required: true, select: false })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
  
}

export const AccountSchema = SchemaFactory.createForClass(Account);
