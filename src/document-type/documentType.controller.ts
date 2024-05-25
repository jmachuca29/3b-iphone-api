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
import { DocumentTypeService } from './documentType.service';
import { CreateDocumentTypeDto } from 'src/dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from 'src/dto/update-document-type.dto';

@Controller('document-type')
export class DocumentTypeController {
  constructor(private documentTypeService:  DocumentTypeService) { }

  @Get()
  findAll() {
    return this.documentTypeService.findAll();
  }

  @Post()
  async create(@Body() body: CreateDocumentTypeDto) {
    try {
      return await this.documentTypeService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('DocumentType already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const color = await this.documentTypeService.findOne(id);
    if (!color) throw new NotFoundException('DocumentType does not exist!');
    return color;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const color = await this.documentTypeService.delete(id);
    if (!color) throw new NotFoundException('DocumentType does not exist!');
    return color;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDocumentTypeDto) {
    const color = await this.documentTypeService.update(id, body);
    if (!color) throw new NotFoundException('DocumentType does not exist!');
    return color;
  }
}
