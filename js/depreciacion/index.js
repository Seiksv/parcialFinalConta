document
  .getElementById("depreciationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    var valorActivo = parseFloat(document.getElementById("valorActivo").value);
    var vidaUtil = parseInt(document.getElementById("vidaUtil").value);
    var valorResidual = parseFloat(
      document.getElementById("valorResidual").value || "0"
    );

    // Calcular los resultados de depreciación
    var depreciationAnual = (valorActivo - valorResidual) / vidaUtil;
    var tablaDepreciacion = document
      .getElementById("tablaDepreciacion")
      .getElementsByTagName("tbody")[0];
    tablaDepreciacion.innerHTML = "";

    for (var i = 1; i <= vidaUtil; i++) {
      var depreciationRow = "<tr>";
      depreciationRow += "<td>" + i + "</td>";
      depreciationRow += "<td>" + depreciationAnual.toFixed(2) + "</td>";

      var accumulatedDepreciation = depreciationAnual * i;
      depreciationRow += "<td>" + accumulatedDepreciation.toFixed(2) + "</td>";

      var percentageDepreciated = (accumulatedDepreciation / valorActivo) * 100;
      depreciationRow += "<td>" + percentageDepreciated.toFixed(2) + "</ td>";

      var remainingValue =
        valorActivo - valorResidual - accumulatedDepreciation;
      depreciationRow += "<td>" + remainingValue.toFixed(2) + "</ td>";

      depreciationRow += "</tr>";

      tablaDepreciacion.innerHTML += depreciationRow;
    }

    // Mostrar la tabla
    document.getElementById("tablaDepreciacion").style.display = "table";
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
  const valorActivo = document.getElementById("valorActivo");
  const vidaUtil = document.getElementById("vidaUtil");

  valorActivo.value = activosGuardados[selectActivo.value].valor;
  vidaUtil.value = activosGuardados[selectActivo.value].vidaUtil;
};
