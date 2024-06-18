import { Injectable } from "@nestjs/common";
import * as PDFDocument from "pdfkit"
import { Sale } from "src/schemas/sale.schema";
const SibApiV3Sdk = require("@getbrevo/brevo");

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmail(sale: Sale, host: string): Promise<any> {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    return new Promise<any>((resolve, reject) => {
      let apiKey = apiInstance.authentications["apiKey"];
      apiKey.apiKey = process.env.BREVO_API_KEY;

      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

      sendSmtpEmail.templateId = 2;
      sendSmtpEmail.sender = {
        name: "3BIphone TestEmail",
        email: "paul.vega@3biphones.com",
      };
      sendSmtpEmail.to = [{ email: sale?.user?.email, name: sale?.user?.name + ' ' + sale?.user?.lastName }];
      sendSmtpEmail.replyTo = { email: "paul.vega@3biphones.com", name: "3BIphone TestEmail" };
      sendSmtpEmail.params = {
        NAME: sale?.user?.name || 'Estimad@',
        ORDER: sale?.uuid,
        DEPARTMENT: sale?.user?.department,
        PROVINCE: sale?.user?.province,
        DISTRICT: sale?.user?.district,
        ADDRESS: sale?.user?.address,
        PRODUCTNAME: sale?.productName,
        CAPACITY: sale?.capacity,
        PRICE: sale?.price,
        DATE: sale?.createdAt,
        APIURL: `${host}/api/email/pdf/${sale['_id']}`
      };

      apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
          console.log("API called successfully.");
          resolve(data);
        },
        function (error) {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  async generatePDF(sale: Sale): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument({
        size: 'A5',
        bufferPages: true,
        margin: 40
      });
  
      const buffer: Buffer[] = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
  
      const titleStyle = {
        fontSize: 16,
        font: 'Helvetica-Bold',
        color: '#000000'
      };
      
      const subtitleStyle = {
        fontSize: 14,
        font: 'Helvetica-Bold',
        color: '#000000'
      };
      
      const textStyle = {
        fontSize: 12,
        font: 'Helvetica',
        color: '#333333'
      };
  
      doc
        .font(titleStyle.font)
        .fontSize(titleStyle.fontSize)
        .fillColor(titleStyle.color)
        .text('INSTRUCCIONES DE ENVIO', { align: 'center' })
        .moveDown();
  
      doc
        .font(subtitleStyle.font)
        .fontSize(subtitleStyle.fontSize)
        .fillColor(subtitleStyle.color)
        .text('OBLIGATORIO', { align: 'left' })
        .moveDown();
  
      doc
        .font(textStyle.font)
        .fontSize(textStyle.fontSize)
        .fillColor(textStyle.color)
        .text('1. Restablece tu dispositivo de fábrica entrando en: Ajuste, General, Transferir o restablecer iPhone, BORRAR CONTENIDO Y CONFIGURACIÓN. Coloca la cuenta de iCloud y espera a que finalice el proceso. En caso no sepas como hacerlo puedes buscar información de Como restablecer de fábrica un iPhone en YouTube.', { align: 'left' })
        .moveDown()
        .text('2. Utiliza la caja original del iPhone para protegerlo u otra similar de otra marca o dispositivo electrónico.', { align: 'left' })
        .moveDown()
        .text('3. Utiliza una caja más grande para asegurar su transporte. Puedes usar una caja de zapatos por ejemplo o una caja de carton diferente que envuelva totalmente a la caja que contiene el teléfono.', { align: 'left' })
        .moveDown();
  
      doc
        .font(subtitleStyle.font)
        .fontSize(subtitleStyle.fontSize)
        .fillColor(subtitleStyle.color)
        .text('SUGERENCIAS', { align: 'left' })
        .moveDown();
  
      doc
        .font(textStyle.font)
        .fontSize(textStyle.fontSize)
        .fillColor(textStyle.color)
        .text('Puedes utilizar adicionalmente, papel reciclable, periódico o de burbujas para tu empaque. No es obligatorio.', { align: 'left' })
        .moveDown();
  
      doc
        .font(subtitleStyle.font)
        .fontSize(subtitleStyle.fontSize)
        .fillColor(subtitleStyle.color)
        .text('IMPRIME, RECORTA Y PEGA O ESCRIBE ESTOS DATOS CON INDELEBLE EN LA CAJA', { align: 'left' })
        .moveDown();
  
      doc
        .font(textStyle.font)
        .fontSize(textStyle.fontSize)
        .fillColor(textStyle.color)
        .text(`NRO DE ORDEN: ${sale?.uuid}`, { align: 'left' })
        .moveDown()
        .text(`NOMBRES Y APELLIDOS: ${sale?.user?.name + ' ' + sale?.user?.lastName}`, { align: 'left' })
        .moveDown()
        .text(`NRO DE CELULAR: ${sale?.user?.phoneNumber}`, { align: 'left' })
        .moveDown();
  
      doc.end();
    });
  
    return pdfBuffer;
  }
  
}
