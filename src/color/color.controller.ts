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
import { ColorService } from './color.service';
import { CreateColorDto } from 'src/dto/create-color.dto';
import { UpdateColorDto } from 'src/dto/update-color.dto';

@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) { }

  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Post()
  async create(@Body() body: CreateColorDto) {
    try {
      return await this.colorService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Color already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const color = await this.colorService.findOne(id);
    if (!color) throw new NotFoundException('Color does not exist!');
    return color;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const color = await this.colorService.delete(id);
    if (!color) throw new NotFoundException('Color does not exist!');
    return color;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateColorDto) {
    const color = await this.colorService.update(id, body);
    if (!color) throw new NotFoundException('Color does not exist!');
    return color;
  }
}
