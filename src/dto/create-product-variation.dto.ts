import { IsNotEmpty, IsNumber, IsMongoId, ValidateNested, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateProductVariationDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: ObjectId;

  @IsObject()
  @IsNotEmpty()
  attributes: Record<string, string>; // Change to Record instead of Map

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
