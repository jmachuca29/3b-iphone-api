import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "src/account/account.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userDB = await this.accountService.findByEmail(username);
    if (!userDB) return null;
    const validPassword = bcrypt.compareSync(pass, userDB.password);
    if (!validPassword) {
      throw new ConflictException("User / Password not valid");
    }
    const payload = {
      email: userDB.email,
      userId: userDB.user,
    }
    return payload
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
