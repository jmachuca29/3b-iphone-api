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
import { GradeService } from './grade.service';
import { CreateGradeDto } from 'src/dto/create-grade.dto';
import { UpdateGradeDto } from 'src/dto/update-grade.dto';

@Controller('grade')
export class GradeController {
  constructor(private gradeService:  GradeService) { }

  @Get()
  findAll() {
    return this.gradeService.findAll();
  }

  @Post()
  async create(@Body() body: CreateGradeDto) {
    try {
      return await this.gradeService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Grade already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const color = await this.gradeService.findOne(id);
    if (!color) throw new NotFoundException('Grade does not exist!');
    return color;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const color = await this.gradeService.delete(id);
    if (!color) throw new NotFoundException('Grade does not exist!');
    return color;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateGradeDto) {
    const color = await this.gradeService.update(id, body);
    if (!color) throw new NotFoundException('Grade does not exist!');
    return color;
  }
}
