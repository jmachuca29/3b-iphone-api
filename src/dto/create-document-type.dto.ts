import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentTypeDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}
