import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Accesories } from "src/constant/accesories";
import { SaleStatus } from "src/constant/sale";

export class CreateSaleDto {
  @ApiProperty({
    description: "Reference to Capacity document",
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  product: ObjectId;

  @ApiProperty({
    description: "Reference to Capacity document",
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  capacity: ObjectId;

  @IsEnum(Accesories)
  accesories: string;

  @IsString()
  @IsNotEmpty()
  serieNumber: string;

  @IsString()
  @IsNotEmpty()
  imei_1: string;

  @IsString()
  @IsNotEmpty()
  imei_2: string;

  @ApiProperty({
    description: "Reference to PaymentType document",
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  paymentType: ObjectId;

  @ApiProperty({
    description: "Reference to Grade document",
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  grade: ObjectId;

  @IsInt()
  @IsNotEmpty()
  battery: number;

  @ApiProperty({
    description: "Reference to User document",
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  user: ObjectId;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(SaleStatus)
  status: string;
}
