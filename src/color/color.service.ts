import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColorDto } from 'src/dto/create-color.dto';
import { UpdateColorDto } from 'src/dto/update-color.dto';
import { Color } from 'src/schemas/color.schema';

@Injectable()
export class ColorService {
    constructor(@InjectModel(Color.name) private colorModel: Model<Color>){}

    async create(createCapacityDto: CreateColorDto): Promise<Color> {
        const createdTask = new this.colorModel(createCapacityDto);
        return createdTask.save();
      }

   async findAll(): Promise<Color[]> {
    return this.colorModel.find().exec();
  }

  async findOne(id: string): Promise<Color> {
    return this.colorModel.findById(id).exec();
  }

  async delete(id: string): Promise<Color> {
    return this.colorModel.findByIdAndDelete(id);
  }

  async update(id: string, createCapacityDto: UpdateColorDto): Promise<Color> {
    return this.colorModel.findByIdAndUpdate(id, createCapacityDto, { new: true });
  }

}
