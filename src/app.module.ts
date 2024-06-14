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
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { UbigeoModule } from './ubigeo/ubigeo.module';
import { EmailModule } from './email/email.module';

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
    AccountModule,
    AuthModule,
    UbigeoModule,
    EmailModule,
    MongooseModule.forRoot(process.env.DB),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
