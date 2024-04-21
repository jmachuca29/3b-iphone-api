import {
    Controller,
    Get,
    NotFoundException,
    Param,
  } from "@nestjs/common";
import { UbigeoService } from "./ubigeo.service";
  
  @Controller("ubigeo")
  export class UbigeoController {
    constructor(private ubigeoService: UbigeoService) {}
  
    @Get()
    findAll() {
      return this.ubigeoService.findAll();
    }
  
    @Get(":id")
    async findOne(@Param("id") id: string) {
      const ubigeo = await this.ubigeoService.findOne(id);
      if (!ubigeo) throw new NotFoundException("Ubigeo does not exist!");
      return ubigeo;
    }

  }
  