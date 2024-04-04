import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CapacityModule } from './capacity/capacity.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CapacityModule,
    MongooseModule.forRoot('mongodb+srv://jmachucapaulino29:s62VMD6XIuHAK7An@cluster0.4idcgbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
