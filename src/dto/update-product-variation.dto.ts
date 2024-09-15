import { IsNotEmpty, IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

export class UpdateProductVariationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  attributes: Map<string, string>;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
