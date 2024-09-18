import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateAttributeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    values: string[];
}
