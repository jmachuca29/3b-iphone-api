import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGradeDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}
