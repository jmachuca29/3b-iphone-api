import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class UpdateUserDto {
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
  cellphone: string;

  @ApiProperty({
    description: "Reference to TypeDocument document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  typeDocument: ObjectId;

  @IsString()
  @IsOptional()
  documentNumber: string;

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
