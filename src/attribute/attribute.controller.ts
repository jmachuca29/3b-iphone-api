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
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from 'src/dto/create-attribute.dto';
import { UpdateAttributeDto } from 'src/dto/update-attribute.dto';

@Controller('attribute')
export class AttributeController {
  constructor(private attributeService:  AttributeService) { }

  @Get()
  findAll() {
    return this.attributeService.findAll();
  }

  @Post()
  async create(@Body() body: CreateAttributeDto) {
    try {
      return await this.attributeService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Attribute already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const attribute = await this.attributeService.findOne(id);
    if (!attribute) throw new NotFoundException('Attribute does not exist!');
    return attribute;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const attribute = await this.attributeService.delete(id);
    if (!attribute) throw new NotFoundException('Attribute does not exist!');
    return attribute;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateAttributeDto) {
    const attribute = await this.attributeService.update(id, body);
    if (!attribute) throw new NotFoundException('Attribute does not exist!');
    return attribute;
  }
}
