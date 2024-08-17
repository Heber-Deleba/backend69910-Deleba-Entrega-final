import { Router } from "express";
import { cartModel } from "../daos/mongodb/models/cart.model.js";
import { productModel } from "../daos/mongodb/models/product.model.js";
import { ticketModel } from "../daos/mongodb/models/ticket.model.js";
import { validate } from "../middlewares/validation.middleware.js";
import { cartDto } from "../dtos/cart.dto.js";
import { v4 as uuidv4 } from "uuid";
import { authorizations } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findById(id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito", details: error.message });
  }
});

router.post("/", validate(cartDto), async (req, res) => {
  try {
    const { products } = req.body;
    const cart = await cartModel.create({ products });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito", details: error.message });
  }
});

router.post("/:id/products", authorizations(['user']), async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const productExists = await productModel.findById(productId);

    if (!productExists) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const cart = await cartModel.findById(req.params.id);

    const isProductInCart = cart.products.find((p) => p.product.equals(productId));

    if (isProductInCart) {
      isProductInCart.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito", details: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findByIdAndDelete(id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el carrito", details: error.message });
  }
});

router.delete("/:id/products/:productId", async (req, res) => {
  try {
    const { id, productId } = req.params;
    const cart = await cartModel.findById(id);

    const isProductInCart = cart.products.find((p) => p.product.equals(productId));

    if (isProductInCart) {
      cart.products = cart.products.filter((p) => !p.product.equals(productId));
      await cart.save();
      res.json(cart);
    } else {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto del carrito", details: error.message });
  }
});

router.delete("/:id/products", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findById(id);
    cart.products = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar todos los productos del carrito", details: error.message });
  }
});

router.post("/:cid/purchase", authorizations(['user']), async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).populate("products.product");

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    let totalAmount = 0;
    const purchasedProducts = [];
    const failedProducts = [];

    for (const item of cart.products) {
      const product = item.product;
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        totalAmount += item.quantity * product.price;
        purchasedProducts.push(item);
        await product.save();
      } else {
        failedProducts.push(product._id);
      }
    }

    if (purchasedProducts.length === 0) {
      return res.status(400).json({
        error: "No hay productos disponibles para la compra",
        failedProducts,
      });
    }

    const ticket = await ticketModel.create({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: req.user.email,
    });

    cart.products = cart.products.filter(
      (item) => failedProducts.includes(item.product._id)
    );
    await cart.save();

    res.status(200).json({
      message: "Compra finalizada con éxito",
      ticket,
      failedProducts,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al finalizar la compra", details: error.message });
  }
});

export default router;




















/*
import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";




const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

router.post("/:idCart/products/:idProd", controller.addProdToCart);

router.delete("/:idCart/products/:idProd", controller.removeProdToCart);

router.put("/:idCart/products/:idProd", controller.updateProdQuantityToCart);

router.delete("/clear/:idCart", controller.clearCart);

export default router; */
