import {
    Controller,
    Get,
    Post,
    Res,
  } from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';
  
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

    @Get('/pdf')
    async getPDF(
      @Res() res: Response,
    ): Promise<void> {
      const buffer = await this.emailService.generatePDF()
  
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=example.pdf',
        'Content-Length': buffer.length,
      })
  
      res.end(buffer)
    }
  
  }
  