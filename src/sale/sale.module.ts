import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from 'src/schemas/sale.schema';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    ProductModule
  ],
  controllers: [SaleController],
  providers: [SaleService, ProductService],
})
export class SaleModule {}
