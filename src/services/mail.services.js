import nodemailer from "nodemailer";
import { config } from "../config/config.js";
import __dirname from "../dirname.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: config.mailer.auth,
    });
  }

  getMessageTemplate(type, mail) {
    let body = `<h1>Hola ${mail},</h1>`;

    switch (type) {
      case "welcome":
        body += `        
        <p style="font-size: 16px; color: red">Te damos la bienvenida a nuestro servicio de mensajes masivos.</p>
        
        <p style="font-size: 16px; color: red">Si tienes alguna pregunta, no dudes en contactarnos.</p>
        `;
        break;

      case "activation":
        body += `        
        Te damos la bienvenida a nuestro servicio de mensajes masivos. 
        
        Si tienes alguna pregunta, no dudes en contactarnos.
      `;
        break;
    }

    body += `        
    <p style="font-size: 16px; color: red">Saludos,</p>
    <p style="font-size: 16px; color: red">Equipo de Mensajes Masivos</p>
    `;

    return body;
  }

  
  async sendMail({ to, subject, type }) {
    const message = {
      from: config.mailer.auth.user, 
      to,
      subject,
      html: this.getMessageTemplate(type, to), 
    };

    try {
      await this.transporter.sendMail(message);
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('No se pudo enviar el correo'); 
    }
  }
}


export const mailService = new MailService();
