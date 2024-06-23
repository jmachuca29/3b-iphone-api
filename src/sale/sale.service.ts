import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { CreateSaleDto } from "src/dto/create-sale.dto";
import { UpdateSaleStatusDto } from "src/dto/update-sale-status.dto";
import { UpdateSaleDto } from "src/dto/update-sale.dto";
import { Sale } from "src/schemas/sale.schema";

@Injectable()
export class SaleService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<Sale>, @InjectConnection() private readonly connection: Connection) { }

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const createdSale = new this.saleModel(createSaleDto);
    await createdSale.save();
    return this.saleModel.findById(createdSale._id).populate('capacity').exec();
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().populate('capacity').sort({createdAt: -1}).exec();
  }

  async findOne(id: string): Promise<Sale> {
    return this.saleModel.findById(id).exec();
  }

  async findbyEmail(email: string): Promise<Sale[]> {
    return this.saleModel.find({ 'user.email': email }).exec();
  }

  async findAllbyAccount(id: string): Promise<Sale[]> {
    return this.saleModel.find({ 'userId': id }).sort({createdAt: -1}).exec();
  }

  async findbyUID(uuid: string): Promise<Sale> {
    return this.saleModel.findOne({ 'uuid': uuid })
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

  async resetCorrelativeCounter(): Promise<void> {
    const countersCollection = this.connection.collection('counters');
    await countersCollection.updateOne(
      { id: 'sale_sequence' },
      { $set: { seq: 0 } },
      { upsert: true }
    );
  }

}
