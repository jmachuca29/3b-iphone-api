import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductVariation, ProductVariationSchema } from 'src/schemas/product-variation.schema';
import { ProductVariationService } from './product-variation.service';
import { ProductVariationController } from './product-variation.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductVariation.name, schema: ProductVariationSchema }]),
  ],
  exports: [
    ProductVariationService
  ],
  controllers: [ProductVariationController],
  providers: [ProductVariationService],
})
export class ProductVariationModule {}
