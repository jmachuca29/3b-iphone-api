import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { ObjectId } from "mongoose";
import { Accesories } from "src/constant/accesories";
import { Type } from 'class-transformer';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class CreateSaleDto {

  @IsMongoId()
  @IsOptional()
  userId: ObjectId;
  
  @ApiProperty({
    description: "Reference to Product document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  productId: ObjectId;

  @IsString()
  @IsNotEmpty()
  productName: string;

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
  firstImei: string;

  @IsString()
  @IsNotEmpty()
  secondImei: string;

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

  @ValidateNested()
  @Type(() => UserDTO)
  @IsNotEmpty()
  user: UserDTO;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  bankEntity: string;

  @IsString()
  @IsNotEmpty()
  numberAccount: string;

}

