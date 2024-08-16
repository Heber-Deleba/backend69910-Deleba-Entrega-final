import { Router } from "express";
import { userModel } from "../daos/mongodb/models/user.model.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authDto } from "../dtos/auth.dto.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";
import { userDto } from "../dtos/user.dto.js";



const router = Router();

router.post(
  "/login",
  validate(authDto),
  passport.authenticate("login"),
  async (req, res) => {
    try {
      const payload = {
        email: req.user.email,
        role: req.user.role,
      };

      const token = generateToken(payload);

      res.cookie("token", token, {
        maxAge: 100000,
        httpOnly: true,
      });

      res.status(200).json({
        message: "Sesión iniciada",
        token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al iniciar sesión", details: error.message });
    }
  }
);

router.post(
  "/register",
  validate(userDto),
  passport.authenticate("register"),
  async (req, res) => {
    try {
      console.log(req.user);

      res.status(201).json({
        message: "Usuario registrado",
        user: req.user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al registrar", details: error.message });
    }
  }
);

router.get("/current", passport.authenticate("jwt"), async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el usuario", details: error.message });
  }
});

export default router;






































/*


import { Router } from "express";
import { userModel } from "../daos/mongodb/models/user.model.js";
import { createHash } from "../utils/hash.js";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/login",
  }),
  async (req, res) => {
    const payload = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      role: req.user.role,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      maxAge: 100000,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login success",
      token,
    });
  }
);

router.get("/login", (req, res) => {
  res.status(401).json({
    error: "Unauthorized",
  });
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, role, password } = req.body;

  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({
      error: "Missing fields",
    });
  }

  try {
    const hashPassword = await createHash(password);

    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword,
      role,
      cart,
    });

    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el usuario", details: error.message });
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.status(200).json({
      message: "Bienvenido",
      user: req.user,
    });
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Sesión cerrada",
  });
});

export default router; */