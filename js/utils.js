class Utils {
  parseDate(fecha) {
    const fechaISO = fecha;

    // Parsear la fecha
    const customfecha = new Date(fechaISO);

    // Obtener día, mes y año
    const dia = customfecha.getUTCDate().toString().padStart(2, "0");
    const mes = (customfecha.getUTCMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0 a 11
    const anio = customfecha.getUTCFullYear();
    const hora = customfecha.getUTCHours().toString().padStart(2, "0");
    const minutos = customfecha.getUTCMinutes().toString().padStart(2, "0");

    // Formatear la fecha como "dd-mm-yyyy hh:mm"
    const fechaFormateada = `${dia}-${mes}-${anio} ${hora}:${minutos}`;
    return fechaFormateada;
  }

  setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value =
      escape(value) +
      (exdays == null ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
  }

  readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  verifyIfLogged() {
    if (localStorage.getItem) {
      if (localStorage.isLogged) {
        console.log("logged");
        return { id: localStorage.id, username: localStorage.username };
      } else {
        console.log("Not logged");
        return false;
      }
    } else {
      if (readCookie("isLogged")) {
        console.log("logged");
        return { id: readCookie("id"), username: readCookie("username") };
      } else {
        console.log("Not logged");
        return false;
      }
    }
  }

  logOut() {
    if (localStorage.getItem) {
      if (localStorage.isLogged) {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        window.location.href = "/login.html";
      } else {
        window.location.href = "/login.html";
      }
    } else {
      if (readCookie("isLogged")) {
        deleteAllCookies();
        window.location.href = "/login.html";
      } else {
        window.location.href = "/login.html";
      }
    }
  }
}
