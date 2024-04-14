import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAccountDto } from "src/dto/create-account.dto";
import { UpdateAccountDto } from "src/dto/update-account.dto";
import { Account } from "src/schemas/account.schema";

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    await createdAccount.save();
    return this.accountModel.findById(createdAccount._id).populate('user').exec();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(id: string): Promise<Account> {
    return this.accountModel.findById(id).exec();
  }

  async delete(id: string): Promise<Account> {
    return this.accountModel.findByIdAndDelete(id);
  }

  async update(
    id: string,
    createAccountDto: UpdateAccountDto
  ): Promise<Account> {
    return this.accountModel.findByIdAndUpdate(id, createAccountDto, {
      new: true,
    });
  }

  async findByEmail(email: string): Promise<Account> {
    return this.accountModel.findOne({ email }).populate('password').exec();
  }
}
