import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AccountModule } from "src/account/account.module";
import { AccountService } from "src/account/account.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [AuthService, AccountService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
