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
import { ProductVariationService } from "./product-variation.service";
import { CreateProductVariationDto } from "src/dto/create-product-variation.dto";
import { UpdateProductVariationDto } from "src/dto/update-product-variation.dto";

  @Controller("product-variation")
  export class ProductVariationController {
    constructor(private productVariationService: ProductVariationService) {}

    @Get()
    findAll() {
      return this.productVariationService.findAll();
    }

    @Post()
    async create(@Body() body: CreateProductVariationDto) {
      try {
        return await this.productVariationService.create(body);
      } catch (error) {
        if (error.code === 11000) {
          throw new ConflictException("Product Variation already exists");
        }
        throw error;
      }
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
      const productVariation = await this.productVariationService.findOne(id);
      if (!productVariation) throw new NotFoundException("Product Variation does not exist!");
      return productVariation;
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: string) {
      const productVariation = await this.productVariationService.delete(id);
      if (!productVariation) throw new NotFoundException("Product Variation does not exist!");
      return productVariation;
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() body: UpdateProductVariationDto) {
      const productVariation = await this.productVariationService.update(id, body);
      if (!productVariation) throw new NotFoundException("Product Variation does not exist!");
      return productVariation;
    }

    @Get(":id/:gradeId")
    async findProductPrice(@Param("id") id: string) {
      const productPrice = await this.productVariationService.findProductPrice(id)
      if (!productPrice) throw new NotFoundException("Product price does not exist!");
      return productPrice;
    }
  }
