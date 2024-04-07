import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCapacityDto } from 'src/dto/create-capacity.dto';
import { UpdateCapacityDto } from 'src/dto/update-capacity.dto';
import { Capacity } from 'src/schemas/capacity.schema';

@Injectable()
export class CapacityService {
    constructor(@InjectModel(Capacity.name) private capacityModel: Model<Capacity>){}

    async create(createCapacityDto: CreateCapacityDto): Promise<Capacity> {
        const createdTask = new this.capacityModel(createCapacityDto);
        return createdTask.save();
      }

   async findAll(): Promise<Capacity[]> {
    return this.capacityModel.find().exec();
  }

  async findOne(id: string): Promise<Capacity> {
    return this.capacityModel.findById(id).exec();
  }

  async delete(id: string): Promise<Capacity> {
    return this.capacityModel.findByIdAndDelete(id);
  }

  async update(id: string, createTaskDto: UpdateCapacityDto): Promise<Capacity> {
    return this.capacityModel.findByIdAndUpdate(id, createTaskDto, { new: true });
  }

}
