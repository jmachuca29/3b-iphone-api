import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentTypeDto {
    @IsOptional()
    @IsString()
    description: string;
}
