import { Injectable, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAccountDto } from "src/dto/create-account.dto";
import { UpdateAccountDto } from "src/dto/update-account.dto";
import { Account, Role } from "src/schemas/account.schema";

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Account.name) private accountModel: Model<Account>,
        private jwtService: JwtService
    ) { }

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

    async findByEmailAndRole(email: string, role: Role): Promise<any> {
        return this.accountModel.findOne({ email, role }).populate('user').populate('password').exec();
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

    async findByEmail(email: string, role: Role): Promise<any> {
        return this.accountModel.findOne({ email, role: role }).populate('password').exec();
    }

    async forgotPassword(email: string): Promise<any> {
        const token = this.jwtService.sign({ email }, { secret: process.env.JWT_PASSWORD_RESET })
        return token
    }

    async resetPassword(token: string): Promise<any> {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: process.env.JWT_PASSWORD_RESET
            }
        );
        return payload
    }
}
