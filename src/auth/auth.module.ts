import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AccountModule } from "src/account/account.module";
import { AccountService } from "src/account/account.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
// import { jwtConstants } from './constants';

export const jwtConstants = {
  secret:
    "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
};

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AuthService, AccountService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
