import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGradeDto } from 'src/dto/create-grade.dto';
import { UpdateGradeDto } from 'src/dto/update-grade.dto';
import { Grade } from 'src/schemas/grade.schema';

@Injectable()
export class  GradeService {
    constructor(@InjectModel(Grade.name) private gradeModel: Model<Grade>){}

    async create(createGradeDto: CreateGradeDto): Promise<Grade> {
        const createdTask = new this.gradeModel(createGradeDto);
        return createdTask.save();
      }

   async findAll(): Promise<Grade[]> {
    return this.gradeModel.find().exec();
  }

  async findOne(id: string): Promise<Grade> {
    return this.gradeModel.findById(id).exec();
  }

  async delete(id: string): Promise<Grade> {
    return this.gradeModel.findByIdAndDelete(id);
  }

  async update(id: string, createCapacityDto: UpdateGradeDto): Promise<Grade> {
    return this.gradeModel.findByIdAndUpdate(id, createCapacityDto, { new: true });
  }

}
