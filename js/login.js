var profil;

function fetchData() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    "GET",
    "https://63bf82bfa177ed68abb24ee2.mockapi.io/users",
    false
  );
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

$(document).ready(function () {
  var dataProfil = fetchData();
  var dp = JSON.parse(dataProfil);
  profil = dp[0];
  console.log(profil);
});

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var status = false;

  if (email == profil.email && password == profil.password) {
    status = true;
  } else {
    alert("Email password salah");
  }
  return status;
}
