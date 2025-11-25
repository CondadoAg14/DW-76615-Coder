import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager("./data/carts.json");

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const id = Number(req.params.cid);
    const cart = await cartManager.getCartById(id);

    if (!cart)
      return res.status(404).json({ error: "Carrito no encontrado" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);

    const updatedCart = await cartManager.addProductToCart(cid, pid);

    if (!updatedCart)
      return res.status(404).json({ error: "Carrito o producto no encontrado" });

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar carrito" });
  }
});

export default router;