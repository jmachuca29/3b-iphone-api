import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { ObjectId } from "mongoose";
import { Accesories } from "src/constant/accesories";
import { Type } from 'class-transformer';

export class UserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  department: string;

  @IsString()
  @IsOptional()
  province: string;

  @IsString()
  @IsOptional()
  district: string;

  @IsString()
  @IsOptional()
  address: string;
}

export class UpdateSaleDto {

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
  @IsOptional()
  productName: string;

  @ApiProperty({
    description: "Reference to Capacity document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  capacity: ObjectId;

  @IsArray()
  @IsEnum(Accesories, { each: true })
  accesories: Accesories[];

  @IsString()
  @IsOptional()
  serieNumber: string;

  @IsString()
  @IsOptional()
  firstImei: string;

  @IsString()
  @IsOptional()
  secondImei: string;

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

  @ValidateNested()
  @Type(() => UserDTO)
  @IsOptional()
  user: UserDTO;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  uuid: string;

  @IsString()
  @IsOptional()
  bankEntity: string;

  @IsString()
  @IsOptional()
  numberAccount: string;

  @IsString()
  @IsOptional()
  documentType: string;

  @IsString()
  @IsOptional()
  documentNumber: string;

}