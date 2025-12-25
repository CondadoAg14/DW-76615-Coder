# Backend Ecommerce – Entrega Final

Proyecto de Backend desarrollado como entrega final del curso, utilizando Node.js, Express y MongoDB Atlas como sistema de persistencia principal.

El objetivo del proyecto es implementar una API REST profesional para la gestión de productos y carritos, junto con vistas renderizadas mediante Handlebars.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Mongoose Paginate v2
- Express-Handlebars
- Dotenv

---

## 📦 Instalación y ejecución

### 1. Clonar el repositorio
(bash)
git clone <url-del-repositorio>
cd <nombre-del-proyecto>

### 2. Instalar Dependencias
npm install

### 3. Crear archivo .env
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/ecommerce

### 4. Ejecutar el servidor
npm run start

## Servidor disponible en:
http://localhost:8080

---

## 🗄️ Persistencia de datos

La persistencia se realiza mediante MongoDB Atlas, utilizando Mongoose como ODM para la gestión de esquemas y modelos.

## 📚 Endpoints disponibles

### Productos

GET /api/products
Soporta paginación, filtros y ordenamiento.

GET /api/products/:pid
Obtiene un producto por su ID.

POST /api/products
Crea un nuevo producto.

### Carritos

POST /api/carts
Crea un carrito vacío.

GET /api/carts/:cid
Obtiene un carrito específico con los productos completos mediante populate.

PUT /api/carts/:cid
Reemplaza todos los productos del carrito.

PUT /api/carts/:cid/products/:pid
Actualiza la cantidad de un producto específico del carrito.

DELETE /api/carts/:cid/products/:pid
Elimina un producto específico del carrito.

DELETE /api/carts/:cid
Vacía completamente el carrito.

## 🖥️ Vistas Disponibles

/products
Listado de productos con paginación.

/products/:pid
Vista de detalle de un producto.

/carts/:cid
Visualización de un carrito específico.

La ruta raíz / redirige a /products.

## 📐 Arquitectura del proyecto

Separación de rutas, modelos y configuración

Relación entre productos y carritos mediante referencias

Uso de populate para desglosar productos asociados

Estructura alineada con buenas prácticas de Express

## ✅ Estado del proyecto

✔ Persistencia con MongoDB Atlas
✔ Endpoints completos según la rúbrica
✔ Paginación, filtros y ordenamiento funcionales
✔ Relación entre modelos correctamente implementada
✔ Vistas funcionales con Handlebars

## Autor
Agustin Condado
agusconda3@gmail.com

## Proyecto Final - Backend I - Coderhouse