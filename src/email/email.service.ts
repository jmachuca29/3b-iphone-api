import { Injectable } from "@nestjs/common";
// import * as SibApiV3Sdk from "@getbrevo/brevo";
const SibApiV3Sdk = require("@getbrevo/brevo");

@Injectable()
export class EmailService {
  constructor() {
    // let apiInstance = new SibApiV3Sdk.AccountApi();
    // apiInstance.setApiKey(
    //     SibApiV3Sdk.AccountApiApiKeys.apiKey,
    //   "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"
    // );
    // apiInstance.getAccount().then(
    //   function (data) {
    //     console.log(
    //       "API called successfully. Returned data: " + JSON.stringify(data)
    //     );
    //   },
    //   function (error) {
    //     console.error(error);
    //   }
    // );
  }

  async sendEmail(): Promise<any> {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    return new Promise<any>((resolve, reject) => {
      let apiKey = apiInstance.authentications["apiKey"];
      apiKey.apiKey =
        "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";

      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

      sendSmtpEmail.templateId = 1;
      sendSmtpEmail.params = {
        "subject": "Custom Subject 22",
      };
      sendSmtpEmail.subject = "My {{params.subject}}";
      //   sendSmtpEmail.htmlContent =
      //     "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
      sendSmtpEmail.sender = {
        name: "Joe Machuca",
        email: "jmachucapaulino29@gmail.com",
      };
      sendSmtpEmail.to = [{ email: "paulmax951@gmail.com", name: "Paul Vega" }];
      // sendSmtpEmail.cc = [{ email: "example2@example2.com", name: "Janice Doe" }];
      // sendSmtpEmail.bcc = [{ name: "John Doe", email: "example@example.com" }];
      // sendSmtpEmail.replyTo = { email: "replyto@domain.com", name: "John Doe" };
      sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
      sendSmtpEmail.params = {
        parameter: "My param value",
        subject: "New Subject",
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
}
