import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCapacityDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}
