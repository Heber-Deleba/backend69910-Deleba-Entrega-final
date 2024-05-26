import { v4 as uuidv4 } from 'uuid';


let products = [];

export const getProducts = () => {
  return products;
};

export const addProduct = (product) => {
  const newProduct = { id: uuidv4(), ...product };
  products.push(newProduct);
  return newProduct;
};

export const deleteProduct = (id) => {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return true;
  }
  return false;
};
