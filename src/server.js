import express from 'express';
import mongoose from "mongoose";
import morgan from 'morgan';
import productsRoutes from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import { errorHandler } from './middlewares/error.Handler.js';
import { initMongoDB } from './db/database.js'; 
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { initializePassport } from "./config/passport.config.js";
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";
import routes from "./routes/index.js";

const app = express();
const PORT = config.PORT || 8080; 

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

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Passport config
initializePassport();
app.use(passport.initialize());

// Routes
app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/products', productsRoutes);
app.use('/carts', cartRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API'); // Puedes cambiar el mensaje según tu preferencia
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// Initialize MongoDB connection (ensure this function is correctly defined)
initMongoDB();









/*

import express from 'express';
import mongoose from "mongoose";
import morgan from 'morgan';
import productsRoutes from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import { errorHandler } from './middlewares/error.Handler.js';
import { initMongoDB } from './db/database.js';
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { initializePassport } from "./config/passport.config.js";
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";
import routes from "./routes/index.js";




const app = express();
//const PORT = 5000;

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


// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Passport config
initializePassport();
app.use(passport.initialize());

// Mongo config
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/products', productsRoutes);
app.use('/carts', cartRouter);

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


initMongoDB()
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });



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


const app = express();
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});



// configuracion de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// configuracion de passport
initializePassport();
app.use(passport.initialize());



// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

app.use(errorHandler);



//inicializador mongo

initMongoDB()
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
*/





















