import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateAttributeDto {
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    values: string[];
}
