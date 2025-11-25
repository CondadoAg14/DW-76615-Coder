import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ProductManager from "./managers/ProductManager.js";

const app = express();
const PORT = 8080;

const productManager = new ProductManager("./data/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(PORT, () =>
  console.log(`Servidor escuchando en puerto ${PORT}`)
);

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  socket.emit("products", await productManager.getProducts());

  socket.on("newProduct", async (data) => {
    await productManager.addProduct(data);
    io.emit("products", await productManager.getProducts());
  });

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(Number(id));
    io.emit("products", await productManager.getProducts());
  });
});