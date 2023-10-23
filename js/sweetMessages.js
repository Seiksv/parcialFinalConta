function succeed(title = "Agregado correctamente") {
  Swal.fire({
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
}

function error(title = "Agregado correctamente") {
  Swal.fire({
    icon: "error",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
}
