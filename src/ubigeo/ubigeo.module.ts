import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ubigeo, UbigeoSchema } from 'src/schemas/ubigeo.schema';
import { UbigeoController } from './ubigeo.controller';
import { UbigeoService } from './ubigeo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ubigeo.name, schema: UbigeoSchema }]),
  ],
  controllers: [UbigeoController],
  providers: [UbigeoService],
})
export class UbigeoModule {}
