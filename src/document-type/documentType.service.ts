import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentTypeDto } from 'src/dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from 'src/dto/update-document-type.dto';
import { DocumentType } from 'src/schemas/document-type';

@Injectable()
export class  DocumentTypeService {
    constructor(@InjectModel(DocumentType.name) private documentTypeModel: Model<DocumentType>){}

    async create(createDocumentTypeDto: CreateDocumentTypeDto): Promise<DocumentType> {
        const createdDocumentType = new this.documentTypeModel(createDocumentTypeDto);
        return createdDocumentType.save();
      }

   async findAll(): Promise<DocumentType[]> {
    return this.documentTypeModel.find().exec();
  }

  async findOne(id: string): Promise<DocumentType> {
    return this.documentTypeModel.findById(id).exec();
  }

  async delete(id: string): Promise<DocumentType> {
    return this.documentTypeModel.findByIdAndDelete(id);
  }

  async update(id: string, createDocumentTypeDto: UpdateDocumentTypeDto): Promise<DocumentType> {
    return this.documentTypeModel.findByIdAndUpdate(id, createDocumentTypeDto, { new: true });
  }

}
