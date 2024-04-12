import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CapacityModule } from './capacity/capacity.module';
import { ColorModule } from './color/color.module';
import { GradeModule } from './grade/grade.module';
import { PaymentTypeModule } from './payment-type/paymentType.module';
import { DocumentTypeModule } from './document-type/documentType.module';
import { DepartmentModule } from './deparment/department.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CapacityModule,
    ColorModule,
    GradeModule,
    PaymentTypeModule,
    DocumentTypeModule,
    DepartmentModule,
    ProductModule,
    SaleModule,
    UserModule,
    MongooseModule.forRoot('mongodb+srv://jmachucapaulino29:s62VMD6XIuHAK7An@cluster0.4idcgbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
