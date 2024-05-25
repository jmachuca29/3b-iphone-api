import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentTypeDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}
