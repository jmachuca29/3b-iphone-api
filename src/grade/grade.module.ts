import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade, GradeSchema } from 'src/schemas/grade.schema';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]),
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
