import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateUserDto {
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
  @IsMongoId()
  @IsNotEmpty()
  ubigeo: ObjectId;

  @IsString()
  @IsNotEmpty()
  address: string;
}
