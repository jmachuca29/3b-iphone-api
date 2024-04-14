import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty({
    description: "Reference to User document",
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  user: ObjectId;
}
