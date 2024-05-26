import { Router } from 'express';
import { getCarts, addCart, deleteCart } from '../managers/cart.manager.js';

const router = Router();

router.get('/', (req, res) => {
  const carts = getCarts();
  res.json(carts);
});

router.post('/', (req, res) => {
  const cart = req.body;
  const newCart = addCart(cart);
  res.status(201).json(newCart);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const success = deleteCart(id);
  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

export default router;

