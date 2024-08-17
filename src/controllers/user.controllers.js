import { mailService } from "../services/mail.services.js";
import { smsService } from "../services/sms.services.js";

// DB
const users = [];

class UserController {
  async getAll(req, res) {
    res.status(200).json(users);
  }

  async create(req, res) {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({
        error: "Email ya existe",
      });
    }

    users.push({
      name,
      email,
      phone,
    });

    // Enviar mail de bienvenida
    await mailService.sendMail({
      to: email,
      subject: "mail masivo de bienvenida",
      type: "welcome",
    });

    await smsService.sendSms(
      phone,
      "Bienvenido a nuestro servicio de mensajes masivos"
    );

    res.status(201).json(users);
  }

  async activate(req, res) {
    try {
      // token = email encriptado
      const { token } = req.params;
  
      // Chequear que el token sea válido
      let email;
      try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        email = decodedToken.email;
      } catch (error) {
        return res.status(400).json({ error: 'Token inválido o expirado' });
      }
  
      // Buscar al usuario por email
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Si el usuario ya está activado, devolver error
      if (user.isActive) {
        return res.status(400).json({ error: 'El usuario ya está activado' });
      }
  
      // Activar el usuario
      user.isActive = true;
      await user.save();
  
      // Devolver éxito
      res.status(200).json({ message: 'Usuario activado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al activar el usuario', details: error.message });
    }
  
  }
}

export const userController = new UserController();