import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Capacity, CapacitySchema } from 'src/schemas/capacity.schema';
import { CapacityController } from './capacity.controller';
import { CapacityService } from './capacity.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Capacity.name, schema: CapacitySchema }]),
  ],
  controllers: [CapacityController],
  providers: [CapacityService],
})
export class CapacityModule {}
