import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentType, PaymentTypeSchema } from 'src/schemas/payment-type';
import { PaymentTypeController } from './paymentType.controller';
import { PaymentTypeService } from './paymentType.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentType.name, schema: PaymentTypeSchema }]),
  ],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
})
export class PaymentTypeModule {}
