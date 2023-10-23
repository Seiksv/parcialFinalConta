// Función para calcular la depreciación anual
function calcularDepreciacion() {
  let costoActivo = parseFloat(document.getElementById("costoActivo").value);
  let vidaUtilTotal = parseInt(document.getElementById("vidaUtilTotal").value);
  let valorResidual = parseInt(document.getElementById("valorResidual").value);

  let tablaHTML = "";
  let depreciacionAnual = 0;
  let depreciacionAnualAcumulada = 0;
  let vidaUtildepreciadaAcumulada = 0;
  let vidaUtilResidual = 0;
  let valorDepreciado = 0;
  document.querySelector("#resultadoTabla tbody").innerHTML = "";

  for (let i = 1; vidaUtildepreciadaAcumulada < vidaUtilTotal; i++) {
    let vidaUtilAnual = parseInt(
      prompt(
        `La vida util actual es de ${vidaUtildepreciadaAcumulada} Ingrese la Vida Útil Anual para el Año ${i}:`
      )
    );

    vidaUtildepreciadaAcumulada += vidaUtilAnual;
    vidaUtilResidual = vidaUtilTotal - vidaUtildepreciadaAcumulada;
    depreciacionAnual =
      (vidaUtilAnual / vidaUtilTotal) * (costoActivo - valorResidual);
    depreciacionAnualAcumulada += depreciacionAnual;
    let valorActivoEnLibro = costoActivo - depreciacionAnualAcumulada;

    let porcentajeDepreciado = (depreciacionAnualAcumulada / costoActivo) * 100;
    tablaHTML += `<tr><td>${i}</td><td>$${depreciacionAnual.toFixed(
      2
    )}</td><td>$${vidaUtildepreciadaAcumulada.toFixed(
      2
    )}</td><td>$${depreciacionAnualAcumulada.toFixed(
      2
    )}</td><td>$${valorActivoEnLibro.toFixed(
      2
    )}</td><td>${porcentajeDepreciado.toFixed(2)}%</td></tr>`;
  }

  document.querySelector("#resultadoTabla tbody").innerHTML += tablaHTML;
}

// Evento submit del formulario
document
  .getElementById("depreciacionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    calcularDepreciacion();
  });

const activosGuardados = JSON.parse(localStorage.getItem("activos")) || [];
const selectActivo = document.getElementById("selectActivo");
activosGuardados.forEach((activo, index) => {
  const option = document.createElement("option");
  option.textContent = activo.serie;
  option.text = activo.nombre;
  option.value = index;
  selectActivo.appendChild(option);
});

selectActivo.onchange = function () {
  const valorActivo = document.getElementById("costoActivo");
  const tipoActivo = document.getElementById("tipoActivo");

  valorActivo.value = activosGuardados[selectActivo.value].valor;
  tipoActivo.innerHTML = activosGuardados[selectActivo.value].tipo;
};
