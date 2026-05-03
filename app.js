let dersListesi = [];
let toplamKredi = 0;
let toplamNot = 0;

function harfToNot(harf) {
  let harfNotu = 0;
  switch (harf) {
    case "A+":
      harfNotu = 4.0;
      break;
    case "A":
      harfNotu = 3.75;
      break;
    case "A-":
      harfNotu = 3.5;
      break;
    case "B+":
      harfNotu = 3.25;
      break;
    case "B":
      harfNotu = 3.0;
      break;
    case "B-":
      harfNotu = 2.75;
      break;
    case "C+":
      harfNotu = 2.5;
      break;
    case "C":
      harfNotu = 2.25;
      break;
    case "C-":
      harfNotu = 2.0;
      break;
    case "D+":
      harfNotu = 1.75;
      break;
    case "D":
      harfNotu = 1.5;
      break;
    case "F":
      harfNotu = 0;
      break;
  }
  return harfNotu;
}

function dersKaydi() {
  const dersKutusu = document.getElementById("ders-adi");
  const krediKutusu = document.getElementById("kredi-sayisi");
  const harfKutusu = document.getElementById("harf-notu");

  if (
    dersKutusu.value === "" ||
    krediKutusu.value === "" ||
    harfKutusu.value === ""
  ) {
    alert("Lütfen tüm alanları doldur!");
    return;
  }

  const yeniDers = {
    isim: dersKutusu.value,
    kredi: Number(krediKutusu.value),
    harf: harfKutusu.value,
  };

  toplamKredi += yeniDers.kredi;
  toplamNot += harfToNot(yeniDers.harf) * yeniDers.kredi;

  const yeniSatir = `
    <tr>
        <td> ${yeniDers.isim} </td>
        <td> ${yeniDers.harf} </td>
        <td> ${yeniDers.kredi} </td>
        <td> <button class="table-buton" > Sil </button> </td>
       </tr>`;

  const tabloGovdesi = document.getElementById("ders-tablosu-body");
  tabloGovdesi.innerHTML += yeniSatir;
}

const ekleButonu = document.getElementById("listeye-ekle");
ekleButonu.addEventListener("click", function () {
  dersKaydi();
  inputTemizle();
});

let ortalama = 0;

function ortalamaBul() {
  ortalama = toplamNot / toplamKredi;
  document.getElementById("sonuc").innerHTML =
    "Genel Ortalama: " + ortalama.toFixed(2);
}

const hesaplamaButonu = document.getElementById("hesaplama-butonu");
hesaplamaButonu.addEventListener("click", ortalamaBul);

const tabloGovdesiSilmeIcin = document.getElementById("ders-tablosu-body");

tabloGovdesiSilmeIcin.addEventListener("click", function (olay) {
  const tiklananEleman = olay.target;

  if (tiklananEleman.classList.contains("table-buton")) {
    const silinecekSatir = tiklananEleman.closest("tr");

    const silinecekHarf = silinecekSatir.children[1].innerText.trim();
    const silinecekKredi = Number(silinecekSatir.children[2].innerText.trim());

    toplamKredi -= silinecekKredi;
    toplamNot -= harfToNot(silinecekHarf) * silinecekKredi;

    silinecekSatir.remove();
  }
});

function ekranıTemizle() {
  document.getElementById("ders-tablosu-body").innerHTML = "";

  toplamKredi = 0;
  toplamNot = 0;

  document.getElementById("sonuc").innerHTML = "";
  document.getElementById("ders-adi").value = "";
  document.getElementById("kredi-sayisi").value = "";
  document.getElementById("harf-notu").value = "";
}

const temizlemeButonu = document.getElementById("temizle-butonu");
temizlemeButonu.addEventListener("click", ekranıTemizle);

function inputTemizle() {
  document.getElementById("ders-adi").value = "";
  document.getElementById("kredi-sayisi").value = "";
  document.getElementById("harf-notu").value = "";
}
