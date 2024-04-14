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
  UseGuards,
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "src/dto/create-account.dto";
import { UpdateAccountDto } from "src/dto/update-account.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "src/dto/create-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("account")
export class AccountController {
  constructor(
    private accountService: AccountService,
    private userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      const email = body.email;
      const user = await this.userService.findByEmail(email);
      if (user)
        throw new ConflictException("Lo sentimos este usuario ya existe");
      const newUser: any = await this.userService.create({
        ...body,
      });

      //Encriptar Contraseña
      const salt = bcrypt.genSaltSync();
      const passwordHashed = bcrypt.hashSync(body.password, salt);
      const account = {
        user: newUser._id,
        email: email,
        password: passwordHashed,
      };
      const accountDB: any = await this.accountService.create(account);
      return accountDB

      return;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException("Account already exists");
      }
      throw error;
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const account = await this.accountService.findOne(id);
    if (!account) throw new NotFoundException("Account does not exist!");
    return account;
  }

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const account = await this.accountService.delete(id);
    if (!account) throw new NotFoundException("Account does not exist!");
    return account;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: UpdateAccountDto) {
    const account = await this.accountService.update(id, body);
    if (!account) throw new NotFoundException("Account does not exist!");
    return account;
  }
}
