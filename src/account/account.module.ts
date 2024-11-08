import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "src/schemas/account.schema";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { EmailModule } from "src/email/email.module";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    UserModule,
    EmailModule,
    JwtModule.register({
        secret: process.env.JWT_PASSWORD_RESET,
        signOptions: { expiresIn: "60s" },
      }),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService, UserService],
})
export class AccountModule {}
