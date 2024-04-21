import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ubigeo } from "src/schemas/ubigeo.schema";

@Injectable()
export class UbigeoService {
  constructor(@InjectModel(Ubigeo.name) private ubigeoModel: Model<Ubigeo>) {}


  async findAll(): Promise<Ubigeo[]> {
    return this.ubigeoModel.find().exec();
  }

  async findOne(id: string): Promise<Ubigeo> {
    return this.ubigeoModel.findById(id).exec();
  }


}
