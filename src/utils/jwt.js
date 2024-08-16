import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const { JWT_SECRET } = config;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "5m",
  });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded;
  } catch (error) {
    throw new Error("Token no valido");
  }
};



/*
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "s3cr3t";

export function generateToken(payload) {
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "5m",
  });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return decoded;
  } catch (error) {
    throw new Error("Token no valido");
  }
}
  */