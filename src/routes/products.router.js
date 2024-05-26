import { Router } from 'express';
import { getProducts, addProduct, deleteProduct } from '../managers/product.manager.js';

const router = Router();


let allProducts = [];

//home
router.get('/', (req, res) => {
  res.render('home', { products: getProducts() });
});

//lista de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: getProducts() });
});

//formulario de agregar productos
router.get('/add', (req, res) => {
  res.render('addProduct');
});

// agregar un producto
router.post('/', (req, res) => {
  const product = req.body;
  const newProduct = addProduct(product);

  allProducts.push(newProduct); 
  const io = req.app.get('io');

  io.emit('productList', allProducts);
  res.redirect('/products'); 
});



//eliminar un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const success = deleteProduct(id);
  const io = req.app.get('io');
  
  if (success) {
    io.emit('productList', getProducts());
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

export default router;












