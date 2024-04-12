import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

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

  @ApiProperty({ description: 'Reference to Color document', required: true })
  @IsMongoId()
  @IsNotEmpty()
  color: ObjectId;

  @ApiProperty({ description: 'URL of the product image' })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Array of prices for different grades',
    type: [Object],
    required: true,
  })
  @IsMongoId({each: true})
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
