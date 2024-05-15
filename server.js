
import express from 'express';
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js';
import morgan from 'morgan';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.use(errorHandler);

const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})
























































































/*


import express from 'express'
import userRouter from './routes/user-routes.js'
import petRouter from './routes/pets.router.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname) 

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.use(express.static(__dirname + '/public'))

__dirname

app.use('/users' , userRouter);
app.use('/pets', petRouter)



const PORT = 8080;

app.listen(PORT, ()=>console.log(`Server on port ${PORT}`))
*/