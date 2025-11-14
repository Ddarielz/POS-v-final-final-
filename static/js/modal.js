function modalCancelacion() {
  // Manejo del formulario del modal
  const formCancelacion = document.getElementById("formCancelacion");
  const modal = document.getElementById("modalCancelacion");
  const inputClave = document.getElementById("clave");
  const btnCerrar = modal.querySelector(".btnCerrar");

  formCancelacion.addEventListener("submit", (e) => {
    e.preventDefault();

    const clave = inputClave.value.trim();

    if (clave === "12345") {
      carrito.length = 0;
      renderCarrito();
      alert("Venta cancelada correctamente.");
      modal.style.display = "none";
      inputClave.value = "";
    } else {
      alert("Contraseña incorrecta. Intente nuevamente.");
      inputClave.value = "";
      inputClave.focus();
    }
  });

  btnCerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

function abrirModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.style.display = "block";
  }
}

function cerrarModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.style.display = "none";
  }
}

function modalAlimentos() {
  const modal = document.getElementById("modalAlimentos");
  const buttons = modal.querySelectorAll("button");

  buttons.forEach((button) => {
    if (button.value) {
      button.addEventListener("click", () => {
        const producto = buscarProductoPorCodigo(button.value);
        if (producto) {
          agregarAlCarrito(producto);
          cerrarModal("modalAlimentos");
        }
      });
    }
  });
}

function modalAdministracion() {
  const modal = document.getElementById("modalAdministracion");
  const buttons = modal.querySelectorAll("button");

  buttons.forEach((button) => {
    if (button.textContent === "Corte X" || button.textContent === "Corte Z" || button.textContent === "Cierre de caja") {
      button.addEventListener("click", () => {
        alert(`Funcionalidad para ${button.textContent} no implementada.`);
      });
    }
  });
}

function modalServicios() {
  const modal = document.getElementById("modalServicios");
  const buttons = modal.querySelectorAll("button");

  buttons.forEach((button) => {
    if (button.textContent === "Luz" || button.textContent === "Agua") {
      button.addEventListener("click", () => {
        const servicio = button.textContent;
        const titulo = document.getElementById("pagoServicioTitulo");
        titulo.textContent = `Pago de ${servicio}`;
        abrirModal("modalPagoServicio");
      });
    }
  });
}

function modalPagoServicio() {
  const modal = document.getElementById("modalPagoServicio");
  const form = modal.querySelector("form");
  const servicioIdInput = document.getElementById("pagoServicioId");
  const montoInput = document.getElementById("pagoServicioMonto");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (servicioIdInput.value.length !== 10) {
      alert("El ID de servicio debe tener 10 caracteres.");
      return;
    }

    const monto = parseFloat(montoInput.value);
    if (isNaN(monto) || monto <= 0) {
      alert("Ingrese un monto válido.");
      return;
    }

    const titulo = document.getElementById("pagoServicioTitulo").textContent;

    const producto = {
      ...buscarProductoPorCodigo("500"),
      nombre: `${titulo} - ${servicioIdInput.value}`,
      precio: monto,
    };

    agregarAlCarrito(producto);
    cerrarModal("modalPagoServicio");
    form.reset();
  });
}

function modalSaldo() {
  const modal = document.getElementById("modalSaldo");
  const form = modal.querySelector("form");
  const buttons = modal.querySelectorAll("button");
  const inputs = modal.querySelectorAll("input");

  let tipoServicio = "Tiempo aire";
  let monto = 0;

  buttons.forEach((button) => {
    if (button.textContent === "Tiempo aire" || button.textContent === "Paquete") {
      button.addEventListener("click", () => {
        tipoServicio = button.textContent;
      });
    } else if (button.textContent.startsWith("$")) {
      button.addEventListener("click", () => {
        monto = parseFloat(button.textContent.substring(1));
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const [telefono, confirmacion] = inputs;

    if (telefono.value !== confirmacion.value) {
      alert("Los números de teléfono no coinciden.");
      return;
    }

    if (monto === 0) {
      alert("Seleccione un monto.");
      return;
    }

    const producto = {
      ...buscarProductoPorCodigo("400"),
      nombre: `${tipoServicio} - ${telefono.value}`,
      precio: monto,
    };

    agregarAlCarrito(producto);
    cerrarModal("modalSaldo");
  });
}


