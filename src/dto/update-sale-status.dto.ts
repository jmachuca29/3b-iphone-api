import { IsEnum } from "class-validator";
import { SaleStatus } from "src/constant/sale";

export class UpdateSaleStatusDto {
  @IsEnum(SaleStatus)
  status: string;
}
