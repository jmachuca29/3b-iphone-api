import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req
} from "@nestjs/common";
import { SaleService } from "./sale.service";
import { CreateSaleDto } from "src/dto/create-sale.dto";
import { UpdateSaleDto } from "src/dto/update-sale.dto";
import { ProductService } from "src/product/product.service";
import { generate } from 'short-uuid';
import { UpdateSaleStatusDto } from "src/dto/update-sale-status.dto";
import { EmailService } from "src/email/email.service";

@Controller("sale")
export class SaleController {
  constructor(private saleService: SaleService, private productService: ProductService, private emailService: EmailService) { }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Post()
  async create(@Body() body: CreateSaleDto, @Req() request: Request) {
    try {
      const host = request.headers['host'];
      const productId = { ...body }?.productId?.toString() || ''
      const grade = { ...body }.grade.toString()
      let sale: CreateSaleDto = null
      if (productId !== '') {
        const productPrice = await this.productService.findProductPrice(productId, grade)
        sale = {
          ...body,
          price: productPrice,
          uuid: generate()
        }
      } else {
        sale = {
          ...body,
          uuid: generate()
        }
      }
      const saleDB = await this.saleService.create(sale);
      this.emailService.sendEmail(saleDB, host)
      return saleDB
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

  @Get("/account/:id")
  async findAllbyAccount(@Param("id") id: string) {
    const sale = await this.saleService.findAllbyAccount(id);
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

  @Patch(":id")
  async updateState(@Param("id") id: string, @Body() body: UpdateSaleStatusDto) {
    const sale = await this.saleService.updateState(id, body);
    if (!sale) throw new NotFoundException("Sale does not exist!");
    return sale;
  }

  @Post('reset-correlative')
  async resetCorrelativeCounter(): Promise<void> {
    await this.saleService.resetCorrelativeCounter();
  }
}
