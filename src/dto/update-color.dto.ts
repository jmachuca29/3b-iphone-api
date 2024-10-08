import { IsOptional, IsString } from 'class-validator';

export class UpdateColorDto {
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    code: string;
}
