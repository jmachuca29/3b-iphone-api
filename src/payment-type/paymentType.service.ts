import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentTypeDto } from 'src/dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from 'src/dto/update-payment-type.dto';
import { PaymentType } from 'src/schemas/payment-type';

@Injectable()
export class  PaymentTypeService {
    constructor(@InjectModel(PaymentType.name) private gradeModel: Model<PaymentType>){}

    async create(createPaymentTypeDto: CreatePaymentTypeDto): Promise<PaymentType> {
        const createdPaymentType = new this.gradeModel(createPaymentTypeDto);
        return createdPaymentType.save();
      }

   async findAll(): Promise<PaymentType[]> {
    return this.gradeModel.find().exec();
  }

  async findOne(id: string): Promise<PaymentType> {
    return this.gradeModel.findById(id).exec();
  }

  async delete(id: string): Promise<PaymentType> {
    return this.gradeModel.findByIdAndDelete(id);
  }

  async update(id: string, createCapacityDto: UpdatePaymentTypeDto): Promise<PaymentType> {
    return this.gradeModel.findByIdAndUpdate(id, createCapacityDto, { new: true });
  }

}
