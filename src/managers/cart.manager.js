import { v4 as uuidv4 } from 'uuid';

let carts = [];

export const getCarts = () => {
  return carts;
};

export const addCart = (cart) => {
  const newCart = { id: uuidv4(), ...cart };
  carts.push(newCart);
  return newCart;
};

export const deleteCart = (id) => {
  const index = carts.findIndex(cart => cart.id === id);
  if (index !== -1) {
    carts.splice(index, 1);
    return true;
  }
  return false;
};
