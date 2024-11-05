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
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "src/dto/create-account.dto";
import { UpdateAccountDto } from "src/dto/update-account.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateUserAccountDto } from "src/dto/create-user-account.dto";
import { Role } from "src/schemas/account.schema";
import { EmailService } from "src/email/email.service";

@Controller("account")
export class AccountController {
    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private emailService: EmailService
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.accountService.findAll();
    }

    @Post()
    async create(@Body() body: CreateUserAccountDto) {
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
            const hash = bcrypt.hashSync(body.password, salt);
            const account = {
                email: email,
                password: hash,
                user: newUser._id,
                role: Role.User
            };
            const accountDB: any = await this.accountService.create(account);
            return accountDB;

        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException("Account already exists");
            }
            throw error;
        }
    }

    @Post("/admin")
    async createAWithRole(@Body() body: CreateAccountDto) {
        try {
            const email = body.email;
            const user = await this.accountService.findByEmailAndRole(email, Role.Admin);
            if (user) {
                throw new ConflictException("Lo sentimos este usuario ya existe");
            }
            //Encriptar Contraseña
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(body.password, salt);
            const account = {
                email: email,
                password: hash,
                role: Role.Admin
            };
            const accountDB: any = await this.accountService.create(account);
            return accountDB

        } catch (error) {
            console.log(error)
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

    @Post("forgot-password")
    async forgotPassword(@Body() body: any) {
        const email = body.email;
        const account = await this.accountService.findByEmailAndRole(email, Role.User);
        if (account) {
            const email = account.email
            const id = account._id
            const token = this.accountService.forgotPassword(email, id)
            await this.emailService.sendResetPasswordEmail(email)
            return token
        }
        return 'Lo sentimos este usuario no existe'
    }

    @Post("reset-password")
    async resetPassword(@Body() body: any) {
        const token = body.token;

        try {
            const payload = await this.accountService.verifyTokenResetPassword(token)
            const password = body?.password
            if(!password) throw new NotFoundException("New Password is required!");
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(body.password, salt);
            const updateData: Partial<UpdateAccountDto> = {
                password: hash,
                email: payload.email
            };
            const accountDB = await this.accountService.update(payload.id, updateData)
            return accountDB
        } catch (error) {
            throw new UnauthorizedException()
        }

    }
}
