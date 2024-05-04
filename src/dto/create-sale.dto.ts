import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Accesories } from "src/constant/accesories";
import { Type } from 'class-transformer';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cellphone: string;

  @IsString()
  @IsNotEmpty()
  ubigeo: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

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

  @IsArray()
  @IsEnum(Accesories, { each: true })
  accesories: Accesories[];

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

  @Type(() => UserDTO)
  @IsNotEmpty()
  user: UserDTO;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  uuid: string;

}

