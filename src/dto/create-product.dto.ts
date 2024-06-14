import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

class ImageDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateProductDto {
  @ApiProperty({ description: 'Description of the product', required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Reference to Capacity document',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  capacity: ObjectId;

  @ValidateNested()
  @Type(() => ImageDTO)
  @IsOptional()
  image: ImageDTO;

  @ApiProperty({
    description: 'Array of prices for different grades',
    type: [Object],
    required: true,
  })
  @ValidateNested()
  @Type(() => PriceDTO)
  @IsNotEmpty()
  prices: PriceDTO[];
}

export class PriceDTO {
  @ApiProperty({ description: 'Reference to Grade document', required: true })
  @IsMongoId()
  @IsNotEmpty()
  grade: ObjectId;

  @ApiProperty({ description: 'Price of the product for this grade', required: true })
  @IsNotEmpty()
  price: number;
}
