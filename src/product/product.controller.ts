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
import { ProductService } from "./product.service";
import { CreateProductDto } from "src/dto/create-product.dto";
import { UpdateProductDto } from "src/dto/update-product.dto";

@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    try {
      return await this.productService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException("Product already exists");
      }
      throw error;
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const product = await this.productService.findOne(id);
    if (!product) throw new NotFoundException("Product does not exist!");
    return product;
  }

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const product = await this.productService.delete(id);
    if (!product) throw new NotFoundException("Product does not exist!");
    return product;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: UpdateProductDto) {
    const product = await this.productService.update(id, body);
    if (!product) throw new NotFoundException("Product does not exist!");
    return product;
  }

  @Get(":id/:gradeId")
  async findProductPrice(@Param("id") id: string, @Param("gradeId") gradeId: string) {
    const productPrice = await this.productService.findProductPrice(id, gradeId)
    if (!productPrice) throw new NotFoundException("Product price does not exist!");
    return productPrice;
  }
}
