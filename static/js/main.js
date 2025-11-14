document.addEventListener("DOMContentLoaded", () => {
  const txtCodigo = document.getElementById("txtCodigo");

  txtCodigo.addEventListener("keydown", (event) => {
    getEntry(event);
  });

  const btnTransferencia = document.getElementById("btnTransferencia");
  btnTransferencia.addEventListener("click", () => {
    alert(`Venta realizada por ${document.getElementById("total").textContent}`);
  });

  const btnSaldo = document.getElementById("btnSaldo");
  btnSaldo.addEventListener("click", () => {
    abrirModal("modalSaldo");
  });

  const btnAlimentos = document.getElementById("btnAlimentos");
  btnAlimentos.addEventListener("click", () => {
    abrirModal("modalAlimentos");
  });

  const btnServicios = document.getElementById("btnServicios");
  btnServicios.addEventListener("click", () => {
    abrirModal("modalServicios");
  });

  const btnAdministracion = document.getElementById("btnAdministracion");
  btnAdministracion.addEventListener("click", () => {
    abrirModal("modalAdministracion");
  });

  modalCancelacion();
  modalAlimentos();
  modalSaldo();
  modalServicios();
  modalAdministracion();
  modalPagoServicio();
});

function getEntry(event) {
  const input = document.getElementById("txtCodigo");
  switch (event.key) {
    case "Enter":
      const codigo = input.value.trim();

      if (!codigo) return;

      buscarProductoPorCodigo(codigo);
      input.value = "";
      break;

    case "Escape":
      eliminarUltimoProducto();
      break;

    case "Tab":
      event.preventDefault();
      tabParaAumentarUnProducto();
      break;

    case "C":
    case "c":
      event.preventDefault();
      if (carrito.length === 0) return;
      abrirModal("modalCancelacion");
      break;
  }
}