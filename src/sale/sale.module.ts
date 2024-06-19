import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema, configureSaleSchema } from 'src/schemas/sale.schema';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { ProductModule } from 'src/product/product.module';
import { EmailModule } from 'src/email/email.module';
import { getConnectionToken } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Sale.name,
        useFactory: (connection) => {
          configureSaleSchema(connection);
          return SaleSchema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    forwardRef(() => ProductModule),
    forwardRef(() => EmailModule)
  ],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService],
})
export class SaleModule {}
