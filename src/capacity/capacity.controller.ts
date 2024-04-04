import {
    Body,
    ConflictException,
    NotFoundException,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    HttpCode,
    Put,
  } from '@nestjs/common';
  import { CapacityService } from './capacity.service';
  
  @Controller('capacity')
  export class CapacityController {
    constructor(private capacityService: CapacityService) {}
  
    @Get()
    findAll() {
      return this.capacityService.findAll();
    }

  }
  