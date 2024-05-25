import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    description: "Reference to User document",
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  user: ObjectId;
}
