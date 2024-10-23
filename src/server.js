import express from 'express';
import session from 'express-session';
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
import mocksRouter from './routes/mocks.router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config.js';


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



// Configuración de sesiones
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));


// Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/products', productsRoutes);
app.use('/carts', cartRouter);
app.use('/api/mocks', mocksRouter);


app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API'); 
});


// Añadir ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// Init MongoDB 
initMongoDB();





























