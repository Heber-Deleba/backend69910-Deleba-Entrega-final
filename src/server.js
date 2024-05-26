import express from 'express';
import { create } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/error.Handler.js';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import path from 'path';
import { getProducts } from './managers/product.manager.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('io', io);

const hbs = create({ extname: '.handlebars', defaultLayout: 'main' });
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRouter);
app.use('/cart', cartRouter);

app.get('/home', (req, res) => {
  const products = getProducts();
  res.render('home', { title: 'Lista de Productos', products });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.emit('productList', getProducts());
});





















/*

import express from 'express';
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js';
import morgan from 'morgan';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/error.Handler.js';

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



*/