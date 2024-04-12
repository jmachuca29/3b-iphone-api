import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSaleDto } from "src/dto/create-sale.dto";
import { UpdateSaleDto } from "src/dto/update-sale.dto";
import { Sale } from "src/schemas/sale.schema";

@Injectable()
export class SaleService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<Sale>) {}

  async create(createSaleDto: CreateSaleDto): Promise<any> {
    const createdSale = new this.saleModel(createSaleDto);
    return createdSale.save();
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }

  async findOne(id: string): Promise<Sale> {
    return this.saleModel.findById(id).exec();
  }

  async delete(id: string): Promise<Sale> {
    return this.saleModel.findByIdAndDelete(id);
  }

  async update(id: string, createSaleDto: UpdateSaleDto): Promise<Sale> {
    return this.saleModel.findByIdAndUpdate(id, createSaleDto, { new: true });
  }

}
