var idx = 0; //index
var list;
var profil;

function fetchData(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

$(document).ready(function () {
  var dataapi = fetchData("https://63bf82bfa177ed68abb24ee2.mockapi.io/kursus");
  list = JSON.parse(dataapi);
  idx = list.length;
  var no = 0;
  var tb = $("#tbody");
  for (var i = 0; i < idx; i++) {
    if (list[i]) {
      var data =
        "<tr><th>" +
        (no + 1) +
        "</th><th id='n" +
        list[i].id +
        "'>" +
        list[i].nama_kursus +
        "</th><th id='p" +
        list[i].id +
        "'>" +
        list[i].harga_kursus +
        "</th>" +
        "<th id='p" +
        list[i].id +
        "'>" +
        list[i].lama_kursus +
        "</th>" +
        "<th style='width: 12%;'><a class='action-icon' onclick='edit(" +
        list[i].id +
        ")'><i class='fa fa-pencil'></i></a><a onclick='deletes(" +
        list[i].id +
        ")' class='action-icon'><i class='fa fa-trash-o'></i></a></th></tr>";
      tb.add(data).appendTo("#tbody");
      no++;
    }
  }

  var dataProfil = fetchData(
    "https://63bf82bfa177ed68abb24ee2.mockapi.io/users"
  );
  var dp = JSON.parse(dataProfil);
  profil = dp[0];

  document.forms.formProfil.nama.value = profil.nama;
  document.forms.formProfil.email.value = profil.email;
  document.forms.formProfil.password.value = profil.password;
});

function edit(id) {
  var data = searchData(id);
  window.location.href = "#edit-kursus";
  document.forms.formEdit.nama.value = data.nama_kursus;
  document.forms.formEdit.harga.value = data.harga_kursus;
  document.forms.formEdit.lamakursus.value = data.lama_kursus;
  document.forms.formEdit.id.value = data.id;
}

function editProcess() {
  var id = document.forms.formEdit.id.value;
  var name = document.forms.formEdit.nama.value;
  var price = document.forms.formEdit.harga.value;
  var lama = document.getElementById("lamakursusEdit").value;

  fetch("https://63bf82bfa177ed68abb24ee2.mockapi.io/kursus/" + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      nama_kursus: name,
      harga_kursus: parseInt(price),
      lama_kursus: lama,
    }),
  })
    .then((response) => {
      response.json().then((response) => {
        console.log(response);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  alert("Edit berhasil");
  window.location.href = "../layout/home-page.html";
}

function editProfile() {
  var nama = document.forms.formProfil.nama.value;
  var email = document.forms.formProfil.email.value;
  var password = document.forms.formProfil.password.value;

  fetch("https://63bf82bfa177ed68abb24ee2.mockapi.io/users/" + 1, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      nama: nama,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      response.json().then((response) => {
        console.log(response);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  alert("Profil diubah");
  window.location.href = "../layout/home-page.html";
}

function deletes(id) {
  fetch("https://63bf82bfa177ed68abb24ee2.mockapi.io/kursus/" + id, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
  alert("Hapus berhasil");
  window.location.href = "../layout/home-page.html";
}

function searchData(id) {
  idx = list.length;
  for (var i = 0; i < idx; i++) {
    if (list[i]) {
      if (list[i].id == id) {
        return list[i];
      }
    }
  }
  console.log(list);
}

function hanyaAngka(event) {
  var angka = event.which ? event.which : event.keyCode;
  if (angka != 46 && angka > 31 && (angka < 48 || angka > 57)) return false;
  return true;
}

function tambahKursus() {
  var name = document.forms.formTambah.nama.value;
  var price = document.forms.formTambah.harga.value;
  var lama = document.getElementById("lamakursus").value;

  fetch("https://63bf82bfa177ed68abb24ee2.mockapi.io/kursus", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nama_kursus: name,
      harga_kursus: parseInt(price),
      lama_kursus: lama,
    }),
  }).then((response) => {
    console.log(response);
  });
  alert("Simpan berhasil");
  window.location.href = "../layout/home-page.html";
}
