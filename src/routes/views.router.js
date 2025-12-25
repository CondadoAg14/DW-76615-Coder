import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { CartModel } from "../models/cart.model.js";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/products");
});

router.get("/products", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const result = await ProductModel.paginate({}, {
    page,
    limit,
    lean: true
  });

  res.render("products", {
    products: result.docs,
    page: result.page,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage
  });
});

router.get("/products/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid).lean();
  if (!product) return res.status(404).send("Producto no encontrado");

  res.render("productDetail", { product });
});

router.get("/carts/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid)
    .populate("products.product")
    .lean();

  if (!cart) return res.status(404).send("Carrito no encontrado");

  res.render("cart", { products: cart.products });
});

export default router;