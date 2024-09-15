import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Attribute {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ required: true })
  values: string[];
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
