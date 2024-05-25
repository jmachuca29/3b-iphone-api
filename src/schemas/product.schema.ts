import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Capacity } from './capacity.schema';
import { Color } from './color.schema';
import { Grade } from './grade.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ trim: true, required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' })
  capacity: Capacity;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Color' })
  color: Color;

  @Prop({ trim: true })
  imageUrl: string;

  @Prop([
    {
      grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
      price: Number,
    },
  ])
  prices: { grade: Grade; price: number }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
