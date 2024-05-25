import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Accesories } from "src/constant/accesories";
import { SaleStatus } from "src/constant/sale";

export class UpdateSaleDto {
  @ApiProperty({
    description: "Reference to Capacity document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  product: ObjectId;

  @ApiProperty({
    description: "Reference to Capacity document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  capacity: ObjectId;

  @IsEnum(Accesories)
  accesories: string;

  @IsString()
  @IsOptional()
  serieNumber: string;

  @IsString()
  @IsOptional()
  imei_1: string;

  @IsString()
  @IsOptional()
  imei_2: string;

  @ApiProperty({
    description: "Reference to PaymentType document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  paymentType: ObjectId;

  @ApiProperty({
    description: "Reference to Grade document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  grade: ObjectId;

  @IsInt()
  @IsOptional()
  battery: number;

  @ApiProperty({
    description: "Reference to User document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  user: ObjectId;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsEnum(SaleStatus)
  status: string;
}
