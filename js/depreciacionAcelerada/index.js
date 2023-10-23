document
  .getElementById("depreciation-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const initialValue = parseFloat(
      document.getElementById("valorActivo").value
    );
    const residualValue = parseInt(
      document.getElementById("valorResidualActivo").value
    );
    const usefulLifeTotal = parseInt(document.getElementById("vidaUtil").value);

    if (isNaN(initialValue) || isNaN(usefulLifeTotal)) {
      alert("Por favor, ingrese valores numéricos válidos.");
      return;
    }

    const depreciationTable = calcularDepreciacionSaldosDecrecientes(
      initialValue,
      residualValue,
      usefulLifeTotal
    );

    // Mostrar la tabla de depreciación
    document.getElementById("depreciation-table").style.display = "block";

    // Limpiar el contenido anterior de la tabla
    let tableBody = document.querySelector("#depreciation-table tbody");
    tableBody.innerHTML = "";

    // Llenar la tabla con los resultados de depreciación
    for (let i = 0; i < depreciationTable.length; i++) {
      let newRow = document.createElement("tr");
      newRow.innerHTML =
        "<td>" +
        (i + 1) +
        "</td>" +
        "<td> $" +
        depreciationTable[i].saldo_inicial +
        "</td>" +
        "<td> $" +
        depreciationTable[i].valorDepreciado +
        "</td>" +
        "<td> $" +
        depreciationTable[i].depreciacionAcumulada +
        "</td>" +
        "<td>" +
        depreciationTable[i].porcentaje +
        "% </td >";
      tableBody.appendChild(newRow);
    }
  });

function calcularDepreciacionSaldosDecrecientes(
  valorInicial,
  valorResidual,
  vidaUtilTotal
) {
  let valorDepreciado = 0;
  let tablaDepreciacion = [];
  let sumatoriaDepreciacion = 0;
  let tasaDepreciacion =
    1 - (valorResidual / valorInicial) ** (1 / vidaUtilTotal);
  let permValorInicial = valorInicial;
  for (let anio = 1; anio <= vidaUtilTotal; anio++) {
    let valorDepreciacion = tasaDepreciacion * valorInicial;
    sumatoriaDepreciacion += valorDepreciacion;

    console.log(sumatoriaDepreciacion);
    tablaDepreciacion.push({
      año: anio,
      saldo_inicial: valorInicial.toFixed(2),
      valorDepreciado: valorDepreciacion.toFixed(2),
      depreciacionAcumulada: sumatoriaDepreciacion.toFixed(2),

      porcentaje: (
        ((permValorInicial - sumatoriaDepreciacion) / permValorInicial) *
        100
      ).toFixed(2),
    });
    valorInicial = valorInicial - valorDepreciacion;
  }
  return tablaDepreciacion;
}

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
  const valorActivo = document.getElementById("valorActivo");
  const vidaUtil = document.getElementById("vidaUtil");

  valorActivo.value = activosGuardados[selectActivo.value].valor;
  vidaUtil.value = activosGuardados[selectActivo.value].vidaUtil;
};
