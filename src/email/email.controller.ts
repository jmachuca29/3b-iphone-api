import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  Body,
  ConflictException,
  Req
} from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';
import { SaleService } from 'src/sale/sale.service';
import { Sale } from 'src/schemas/sale.schema';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService, private saleService: SaleService) { }

  @Post()
  async create(@Body() body: Sale) {
    try {
      return await this.emailService.sendEmail(body);
    } catch (error) {
      throw error;
    }
  }

  @Get("/pdf/:id")
  async getPDF(
    @Param("id") id: any,
    @Res() res: Response
  ): Promise<void> {
    const sale = await this.saleService.findOne(id)
    const buffer = await this.emailService.generatePDF(sale)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=guia_3biphone.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }

}
