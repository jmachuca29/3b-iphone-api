import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from 'src/schemas/department.schema';

@Injectable()
export class  DepartmentService {
    constructor(@InjectModel(Department.name) private departmentModel: Model<Department>){}

   async findAll(): Promise<Department[]> {
    return this.departmentModel.find().exec();
  }

}
