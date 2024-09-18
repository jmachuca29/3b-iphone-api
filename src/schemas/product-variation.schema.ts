import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class ProductVariation extends Document {

  @Prop({ required: true })
  productId: string;

  @Prop({
    type: Map,
    of: String,
    required: true,
    validate: {
      validator: function(value: Map<string, string>) {
        return value && value.size > 0;  // Asegura que el mapa no esté vacío
      },
      message: 'Attributes cannot be empty'
    }
  })
  attributes: Map<string, string>;

  @Prop({ required: true })
  price: number;
}

export const ProductVariationSchema = SchemaFactory.createForClass(ProductVariation);
