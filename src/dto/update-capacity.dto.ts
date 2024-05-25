import { IsOptional, IsString } from 'class-validator';

export class UpdateCapacityDto {
    @IsOptional()
    @IsString()
    description: string;
}
