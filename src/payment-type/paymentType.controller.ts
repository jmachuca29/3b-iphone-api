import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { PaymentTypeService } from './paymentType.service';
import { CreatePaymentTypeDto } from 'src/dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from 'src/dto/update-payment-type.dto';

@Controller('payment-type')
export class PaymentTypeController {
  constructor(private paymentTypeService:  PaymentTypeService) { }

  @Get()
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @Post()
  async create(@Body() body: CreatePaymentTypeDto) {
    try {
      return await this.paymentTypeService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('PaymentType already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const color = await this.paymentTypeService.findOne(id);
    if (!color) throw new NotFoundException('PaymentType does not exist!');
    return color;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const color = await this.paymentTypeService.delete(id);
    if (!color) throw new NotFoundException('PaymentType does not exist!');
    return color;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePaymentTypeDto) {
    const color = await this.paymentTypeService.update(id, body);
    if (!color) throw new NotFoundException('PaymentType does not exist!');
    return color;
  }
}
