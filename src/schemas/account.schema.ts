import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';

export enum Role {
  User = 0,
  Admin = 1,
}

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {

  @Prop({ trim: true, required: true })
  email: string;

  @Prop({ trim: true, required: true, select: false })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  user: User;

  @Prop({ enum: Role, default: Role.User, required: false })
  role: string;
  
}

export const AccountSchema = SchemaFactory.createForClass(Account);
