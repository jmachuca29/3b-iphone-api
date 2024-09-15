import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateProductVariationDto } from "src/dto/create-product-variation.dto";
import { UpdateProductVariationDto } from "src/dto/update-product-variation.dto";
import { ProductVariation } from "src/schemas/product-variation.schema";

@Injectable()
export class ProductVariationService {
  constructor(
    @InjectModel(ProductVariation.name) private productVariationModel: Model<ProductVariation>
  ) {}

  async create(createProductVariationDto: CreateProductVariationDto): Promise<ProductVariation> {
    const createdProduct = new this.productVariationModel(createProductVariationDto);
    return createdProduct.save();
  }

  async findAll(): Promise<ProductVariation[]> {
    return this.productVariationModel.find().exec();
  }

  async findOne(id: string): Promise<ProductVariation> {
    return this.productVariationModel.findById(id).exec();
  }

  async delete(id: string): Promise<ProductVariation> {
    return this.productVariationModel.findByIdAndDelete(id);
  }

  async update(
    id: string,
    createProductVariationDto: UpdateProductVariationDto
  ): Promise<ProductVariation> {
    return this.productVariationModel.findByIdAndUpdate(id, createProductVariationDto, {
      new: true,
    });
  }

  async findProductPrice(id: string): Promise<number> {
    const product = await this.productVariationModel.findById(id).exec();
    if (!product) throw new NotFoundException("Product Variation does not exist!");
    return null
  }
}
