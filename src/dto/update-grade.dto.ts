import { IsOptional, IsString } from 'class-validator';

export class UpdateGradeDto {
    @IsOptional()
    @IsString()
    description: string;
}
