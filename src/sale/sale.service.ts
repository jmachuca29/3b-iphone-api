import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SaleStatus } from "src/constant/sale";
import { CreateSaleDto } from "src/dto/create-sale.dto";
import { UpdateSaleStatusDto } from "src/dto/update-sale-status.dto";
import { UpdateSaleDto } from "src/dto/update-sale.dto";
import { Sale } from "src/schemas/sale.schema";

@Injectable()
export class SaleService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<Sale>) { }

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

  async findbyEmail(email: string): Promise<any> {
    return this.saleModel.find({ 'user.email': email }).exec();
  }

  async findbyUID(uuid: string): Promise<Sale> {
    return this.saleModel.findOne({ 'uuid': uuid })
      .populate({
        path: 'product',
        select: '-prices'
      })
      .populate('capacity')
      .exec();
  }


  async delete(id: string): Promise<Sale> {
    return this.saleModel.findByIdAndDelete(id);
  }

  async update(id: string, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    return this.saleModel.findByIdAndUpdate(id, updateSaleDto, { new: true });
  }

  async updateState(id: string, updateSaleStatusDto: UpdateSaleStatusDto): Promise<Sale> {
    const status = updateSaleStatusDto.status
    return this.saleModel.findByIdAndUpdate(id, { status: status }, { new: true });
  }

}
