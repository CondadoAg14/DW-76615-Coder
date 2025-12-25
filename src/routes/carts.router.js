import { Router } from "express";
import { CartModel } from "../models/cart.model.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Endpoint" });
});

router.post("/", async (req, res) => {
  const cart = await CartModel.create({ products: [] });
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid)
    .populate("products.product");

  if (!cart)
    return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(cart);
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid);
  if (!cart)
    return res.status(404).json({ error: "Carrito no encontrado" });

  cart.products = cart.products.filter(
    p => p.product.toString() !== req.params.pid
  );

  await cart.save();
  res.json(cart);
});

router.put("/:cid", async (req, res) => {
  const { products } = req.body;

  const cart = await CartModel.findByIdAndUpdate(
    req.params.cid,
    { products },
    { new: true }
  );

  if (!cart)
    return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(cart);
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;

  const cart = await CartModel.findById(req.params.cid);
  if (!cart)
    return res.status(404).json({ error: "Carrito no encontrado" });

  const product = cart.products.find(
    p => p.product.toString() === req.params.pid
  );

  if (!product)
    return res.status(404).json({ error: "Producto no encontrado en carrito" });

  product.quantity = quantity;
  await cart.save();

  res.json(cart);
});

router.delete("/:cid", async (req, res) => {
  const cart = await CartModel.findByIdAndUpdate(
    req.params.cid,
    { products: [] },
    { new: true }
  );

  if (!cart)
    return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(cart);
});

export default router;