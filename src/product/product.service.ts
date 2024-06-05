import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateProductDto } from "src/dto/create-product.dto";
import { UpdateProductDto } from "src/dto/update-product.dto";
import { Product } from "src/schemas/product.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('capacity').populate('color').exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }

  async update(
    id: string,
    createProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, createProductDto, {
      new: true,
    });
  }

  async findProductPrice(id: string, gradeId: string): Promise<number> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException("Product does not exist!");
    const prices: any[] = product.prices || [];
    const priceFound = prices.find(
      (price) => price.grade.toString() === gradeId
    );
    return priceFound ? priceFound.price : null;
  }
}
