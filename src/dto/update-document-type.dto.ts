import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentTypeDto {
    @IsOptional()
    @IsString()
    description: string;
}
