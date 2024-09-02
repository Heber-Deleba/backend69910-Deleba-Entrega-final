import { userDao } from '../daos/mongodb/user.dao.js'; 
import { mailService } from "../services/mail.services.js";
import { smsService } from "../services/sms.services.js";
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

class UserController {
  
  async getAll(req, res) {
    try {
      const users = await userDao.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los usuarios", details: error.message });
    }
  }

  
  async create(req, res) {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ error: "Falta información" });
    }

    try {
      if (await userDao.getUserByEmail(email)) {
        return res.status(400).json({ error: "Email ya existe" });
      }

      const newUser = await userDao.createUser({
        first_name,
        last_name,
        email,
        age,
        password,
        role: "user", 
      });

      
      await mailService.sendMail({
        to: email,
        subject: "Bienvenido a nuestro servicio",
        type: "welcome",
      });

      
      await smsService.sendSms(
        phone, 
        "Bienvenido a nuestro servicio de mensajes masivos"
      );

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el usuario", details: error.message });
    }
  }

  
  async activate(req, res) {
    try {
      const { token } = req.params;

      
      let email;
      try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        email = decodedToken.email;
      } catch (error) {
        return res.status(400).json({ error: 'Token inválido o expirado' });
      }

      const user = await userDao.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      if (user.isActive) {
        return res.status(400).json({ error: 'El usuario ya está activado' });
      }

      user.isActive = true;
      await userDao.updateUserById(user._id, user);

      res.status(200).json({ message: 'Usuario activado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al activar el usuario', details: error.message });
    }
  }
}

export const userController = new UserController();
