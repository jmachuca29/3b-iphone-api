import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "src/account/account.service";
import * as bcrypt from "bcrypt";
import { Role } from "src/schemas/account.schema";

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.accountService.findByEmail(username, Role.User);
    if(!user) {
      throw new ConflictException("User / Password not valid");
    }
    const validPassword = bcrypt.compareSync(pass, user.password);
    if (!validPassword) {
      throw new ConflictException("User / Password not valid");
    }
    const payload = { sub: user.user, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET }),
    };
  }

  async signInAdmin(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.accountService.findByEmailAndRole(username, Role.Admin);
    if(!user) {
      throw new ConflictException("User / Password not valid");
    }
    const validPassword = bcrypt.compareSync(pass, user.password);
    if (!validPassword) {
      throw new ConflictException("User / Password not valid");
    }
    const payload = { sub: user.user, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET }),
    };
  }
}
