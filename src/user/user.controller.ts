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
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private productService: UserService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      return await this.productService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException("User already exists");
      }
      throw error;
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const product = await this.productService.findOne(id);
    if (!product) throw new NotFoundException("User does not exist!");
    return product;
  }

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const user = await this.productService.delete(id);
    if (!user) throw new NotFoundException("User does not exist!");
    return user;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    const user = await this.productService.update(id, body);
    if (!user) throw new NotFoundException("User does not exist!");
    return user;
  }
}
