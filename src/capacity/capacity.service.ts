import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CapacityService {


   findAll(): any[] {
    return ['hola mundo']
  }

}
