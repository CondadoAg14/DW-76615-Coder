const socket = io();

const productList = document.getElementById("productList");
const form = document.getElementById("productForm");

socket.on("products", (products) => {
  productList.innerHTML = "";
  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.title}</strong> - $${p.price}
      <button onclick="deleteProduct(${p.id})">Eliminar</button>
    `;
    productList.appendChild(li);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  socket.emit("newProduct", data);
  form.reset();
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}