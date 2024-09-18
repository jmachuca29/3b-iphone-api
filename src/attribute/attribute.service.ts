import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttributeDto } from 'src/dto/create-attribute.dto';
import { UpdateAttributeDto } from 'src/dto/update-attribute.dto';
import { Attribute } from 'src/schemas/attribute.schema';

@Injectable()
export class  AttributeService {
    constructor(@InjectModel(Attribute.name) private attributeModel: Model<Attribute>){}

    async create(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
        const createdTask = new this.attributeModel(createAttributeDto);
        return createdTask.save();
      }

   async findAll(): Promise<Attribute[]> {
    return this.attributeModel.find().exec();
  }

  async findOne(id: string): Promise<Attribute> {
    return this.attributeModel.findById(id).exec();
  }

  async delete(id: string): Promise<Attribute> {
    return this.attributeModel.findByIdAndDelete(id);
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<Attribute> {
    return this.attributeModel.findByIdAndUpdate(id, updateAttributeDto, { new: true });
  }

}
