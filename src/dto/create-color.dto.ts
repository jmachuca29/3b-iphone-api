import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}
