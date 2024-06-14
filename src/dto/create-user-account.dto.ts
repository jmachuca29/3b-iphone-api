import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Role } from "src/schemas/account.schema";

export class CreateUserAccountDto {

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
  cellphone: string;

  @ApiProperty({
    description: "Reference to TypeDocument document",
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  documentType: ObjectId;

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({
    description: "Reference to Ubigeo document",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ubigeo: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: number;
  
}
