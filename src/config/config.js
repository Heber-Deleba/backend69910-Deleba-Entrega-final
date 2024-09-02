import dotenv from "dotenv";

dotenv.config();


export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: 'your-secret-key',
  mailer: {
    host: process.env.MAILER_HOST || "smtp.gmail.com",
    port: process.env.MAILER_PORT || 465,
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    },
  },
  sms: {
    accountSid: 'AC6a2246f44c63b89385017ec9be0748da' ,
    authToken:'9f599a751f14c333f70114afd8adef66' ,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },

};