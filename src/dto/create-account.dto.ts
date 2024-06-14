import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Role } from "src/schemas/account.schema";

export class CreateAccountDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "Reference to TypeDocument document",
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  user?: ObjectId;

  @IsEnum(Role)
  @IsOptional()
  role?: number;
  
}
