const carrito = [];
c;
function agregarAlCarrito(producto) {
  const existente = carrito.find((p) => p.codigo === producto.codigo);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  renderCarrito();
}

async function buscarProductoPorCodigo(codigo) {
  const url = `/products/${codigo}`;
  const response = await fetch(url);

  if (!response.ok) {
    alert("Producto no encontrado.");
    return null;
  }

  const data = await response.json();

  console.log("Producto recibido del servidor:", data);

  if (data) {
    const producto = {
      codigo: data.code_product,
      nombre: data.name_product,
      precio: data.price_product,
    };
    agregarAlCarrito(producto);
  }
}

// 🔹 Elimina el último producto del carrito
function eliminarUltimoProducto() {
  if (carrito.length === 0) return;
  const ultimo = carrito[carrito.length - 1];

  if (ultimo.cantidad > 1) {
    ultimo.cantidad -= 1;
  } else {
    carrito.pop();
  }
  renderCarrito();
}

// 🔹 Aumenta cantidad del último producto
function tabParaAumentarUnProducto() {
  if (carrito.length === 0) return;
  carrito[carrito.length - 1].cantidad += 1;
  renderCarrito();
}

// 🔹 Cancela venta (vacía carrito)
function cancelacion() {
  if (carrito.length === 0) return;
  if (confirm("¿Deseas cancelar toda la venta?")) {
    carrito.length = 0;
    renderCarrito();
  }
}

// 🔹 Elimina un producto específico
function eliminarDelCarrito(producto) {
  if (!producto) return;

  const existente = carrito.find((p) => p.codigo === producto.codigo);

  if (existente) {
    existente.cantidad -= 1;
    if (existente.cantidad <= 0) {
      const index = carrito.indexOf(existente);
      carrito.splice(index, 1);
    }
  }
  renderCarrito();
}

// Cierre de venta
function cierreDeVenta() {
  if (carrito.length > 0) {
    const table = document.querySelector("#tblListaBody");
    let cambio = pago;
  }
}

function renderCarrito() {
  const tbody = document.getElementById("tblListaBody");
  tbody.innerHTML = "";

  let totalGeneral = 0;

  carrito.forEach((item) => {
    const totalItem = item.cantidad * item.precio;
    totalGeneral += totalItem;

    const tr = document.createElement("tr");

    const tdCantidad = document.createElement("td");
    tdCantidad.textContent = item.cantidad;

    const tdProducto = document.createElement("td");
    tdProducto.textContent = item.nombre;

    const tdPrecio = document.createElement("td");
    tdPrecio.textContent = formatearMoneda(item.precio);

    const tdTotal = document.createElement("td");
    tdTotal.textContent = formatearMoneda(totalItem);

    tr.appendChild(tdCantidad);
    tr.appendChild(tdProducto);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdTotal);

    tbody.appendChild(tr);
  });

  document.getElementById("total").textContent = formatearMoneda(totalGeneral);
}
