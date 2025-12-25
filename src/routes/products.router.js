import { Router } from "express";
import { ProductModel } from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
      filter.$or = [
        { category: query },
        { status: query === "true" }
      ];
    }

    const options = {
      limit: Number(limit),
      page: Number(page),
      lean: true,
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {}
    };

    const result = await ProductModel.paginate(filter, options);

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid);
  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });

  res.json(product);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;

    if (!title || !description || !price || !stock || !category) {
      return res.status(400).json({ error: "Campos incompletos" });
    }

    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;