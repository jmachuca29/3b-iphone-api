import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,

  } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}
  
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('admin')
  signInAdmin(@Body() signInDto: Record<string, any>) {
    return this.authService.signInAdmin(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
