import {
    Controller,
    Post,
  } from '@nestjs/common';
import { EmailService } from './email.service';
  
  @Controller('email')
  export class EmailController {
    constructor(private emailService:  EmailService) { }

    @Post()
    async sendEmail() {
      try {
        return await this.emailService.sendEmail();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
  }
  