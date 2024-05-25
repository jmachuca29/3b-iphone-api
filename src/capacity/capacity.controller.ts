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
import { CapacityService } from './capacity.service';
import { CreateCapacityDto } from 'src/dto/create-capacity.dto';
import { UpdateCapacityDto } from 'src/dto/update-capacity.dto';

@Controller('capacity')
export class CapacityController {
  constructor(private capacityService: CapacityService) { }

  @Get()
  findAll() {
    return this.capacityService.findAll();
  }

  @Post()
  async create(@Body() body: CreateCapacityDto) {
    try {
      return await this.capacityService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Capacity already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const capacity = await this.capacityService.findOne(id);
    if (!capacity) throw new NotFoundException('Capacity does not exist!');
    return capacity;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const capacity = await this.capacityService.delete(id);
    if (!capacity) throw new NotFoundException('Capacity does not exist!');
    return capacity;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCapacityDto) {
    const capacity = await this.capacityService.update(id, body);
    if (!capacity) throw new NotFoundException('Capacity does not exist!');
    return capacity;
  }
}
