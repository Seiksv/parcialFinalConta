let utils;

$(document).ready(function () {
  utils = new Utils();
  if (!utils.verifyIfLogged()) {
    window.location.href = "login.html";
  }
});
