import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Department>;

@Schema()
export class Department {
  @Prop({ unique: true, trim: true, required: true })
  id: string;
  @Prop({ unique: true, trim: true, required: true })
  description: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
