import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentTypeSchema } from 'src/schemas/document-type';
import { DocumentTypeController } from './documentType.controller';
import { DocumentTypeService } from './documentType.service';
import { DocumentType } from 'src/schemas/document-type';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DocumentType.name, schema: DocumentTypeSchema }]),
  ],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
