import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UpdateProductDto {
  @ApiProperty({ description: 'Description of the product', required: true })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Reference to Capacity document',
    required: true,
  })
  @IsString()
  @IsOptional()
  capacity: ObjectId;

  @ApiProperty({ description: 'Reference to Color document', required: true })
  @IsString()
  @IsOptional()
  color: ObjectId;

  @ApiProperty({ description: 'URL of the product image' })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Array of prices for different grades',
    type: [Object],
    required: true,
  })
  @IsArray()
  @Type(() => PriceDTO)
  @IsOptional()
  prices: PriceDTO[];
}

export class PriceDTO {
  @ApiProperty({ description: 'Reference to Grade document', required: true })
  @IsString()
  @IsOptional()
  grade: ObjectId;

  @ApiProperty({ description: 'Price of the product for this grade', required: true })
  @IsOptional()
  price: number;
}
