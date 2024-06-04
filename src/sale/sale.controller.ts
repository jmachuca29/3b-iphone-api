import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { SaleService } from "./sale.service";
import { CreateSaleDto } from "src/dto/create-sale.dto";
import { UpdateSaleDto } from "src/dto/update-sale.dto";
import { ProductService } from "src/product/product.service";
import { v4 as uuidv4 } from 'uuid';

@Controller("sale")
export class SaleController {
  constructor(private saleService: SaleService, private productService: ProductService) { }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Post()
  async create(@Body() body: CreateSaleDto) {
    try {
      const productId = { ...body }.product.toString()
      const grade = { ...body }.grade.toString()
      const productPrice = await this.productService.findProductPrice(productId, grade)
      const product: CreateSaleDto = {
        ...body,
        price: productPrice,
        uuid: uuidv4()
      }
      return await this.saleService.create(product);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException("Sale already exists");
      }
      throw error;
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const sale = await this.saleService.findOne(id);
    if (!sale) throw new NotFoundException("Sale does not exist!");
    return sale;
  }

  @Get("/email/:email")
  async findbyEmail(@Param("email") email: string) {
    const sale = await this.saleService.findbyEmail(email);
    if (!sale) throw new NotFoundException("Not sales found!");
    return sale;
  }

  @Get("/uid/:uuid")
  async findbyUID(@Param("uuid") uuid: string) {
    const sale = await this.saleService.findbyUID(uuid);
    if (!sale) throw new NotFoundException("Sale does not exist!");
    return sale;
  }

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const sale = await this.saleService.delete(id);
    if (!sale) throw new NotFoundException("Sale does not exist!");
    return sale;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: UpdateSaleDto) {
    const sale = await this.saleService.update(id, body);
    if (!sale) throw new NotFoundException("Sale does not exist!");
    return sale;
  }
}
