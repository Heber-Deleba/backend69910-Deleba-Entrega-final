import express from 'express';
import morgan from 'morgan';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import { errorHandler } from './middlewares/error.Handler.js';
import { initMongoDB } from './db/database.js';
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { initializePassport } from "./config/passport.config.js";


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






















