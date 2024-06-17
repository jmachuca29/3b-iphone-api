import { Injectable } from "@nestjs/common";
// import * as SibApiV3Sdk from "@getbrevo/brevo";
import * as PDFDocument from "pdfkit"
const fs = require('fs');
const path = require('path');
const SibApiV3Sdk = require("@getbrevo/brevo");
// const PDFDocument = require('pdfkit');


@Injectable()
export class EmailService {
  constructor() {}

  async sendEmail(): Promise<any> {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    return new Promise<any>((resolve, reject) => {
      let apiKey = apiInstance.authentications["apiKey"];
      apiKey.apiKey = process.env.BREVO_API_KEY;

      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

      sendSmtpEmail.templateId = 2;
      // sendSmtpEmail.subject = `My {{params.ORDER}} 22`;
      //   sendSmtpEmail.htmlContent =
      //     "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
      sendSmtpEmail.sender = {
        name: "3BIphone TestEmail",
        email: "paul.vega@3biphones.com",
      };
      sendSmtpEmail.to = [{ email: "paulmax951@gmail.com", name: "Paul Vega" }];
      // sendSmtpEmail.cc = [{ email: "example2@example2.com", name: "Janice Doe" }];
      // sendSmtpEmail.bcc = [{ name: "John Doe", email: "example@example.com" }];
      // sendSmtpEmail.replyTo = { email: "replyto@domain.com", name: "John Doe" };
      sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
      sendSmtpEmail.params = {
        NAMES: [
          { username: "Juan" },
          { username: "Jhon" },
          { username: "Carlos" },
        ],
        ORDER: "999",
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

  async generatePDF(): Promise<Buffer> {
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
        .text('NRO DE ORDEN: XXXXXXXXXXXXXXXXX', { align: 'left' })
        .moveDown()
        .text('NOMBRES Y APELLIDOS: (DE LA ORDEN)', { align: 'left' })
        .moveDown()
        .text('NRO DE CELULAR: (DE LA ORDEN)', { align: 'left' })
        .moveDown();
  
      doc.end();
    });
  
    return pdfBuffer;
  }
  
}
