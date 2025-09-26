// controller_produk.js
import { produk } from "./data_produk.js";

const produkTable = document.getElementById("produkTable");
const produkForm = document.getElementById("produkForm");
const inputId = document.getElementById("produkId");
const inputNama = document.getElementById("nama");
const inputStok = document.getElementById("stok");
const inputHarga = document.getElementById("harga");
const inputDeskripsi = document.getElementById("deskripsi");

function renderProduk() {
  if (!produkTable) return;
  produkTable.innerHTML = "";
  produk.forEach((item, index) => {
    produkTable.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.stok}</td>
        <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
        <td>${item.deskripsi}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="window.editProduk(${item.id})">✏️ Edit</button>
          <button class="btn btn-sm btn-danger" onclick="window.hapusProduk(${item.id})">🗑️ Hapus</button>
        </td>
      </tr>
    `;
  });
}

// Hapus produk by id
window.hapusProduk = function(id) {
  const idx = produk.findIndex(p => p.id === id);
  if (idx !== -1) {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      produk.splice(idx, 1);
      renderProduk();
    }
  }
};

// Edit produk -> isi form (hapus versi lama, nanti disimpan ulang)
window.editProduk = function(id) {
  const item = produk.find(p => p.id === id);
  if (!item) return;
  inputId.value = item.id;
  inputNama.value = item.nama;
  inputStok.value = item.stok;
  inputHarga.value = item.harga;
  inputDeskripsi.value = item.deskripsi;
  // remove original to avoid duplicate id on save
  const idx = produk.findIndex(p => p.id === id);
  if (idx !== -1) produk.splice(idx, 1);
  renderProduk();
};

// submit form tambah/edit
if (produkForm) {
  produkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = {
      id: inputId.value ? parseInt(inputId.value) : Date.now(),
      nama: inputNama.value.trim(),
      stok: parseInt(inputStok.value),
      harga: parseInt(inputHarga.value),
      deskripsi: inputDeskripsi.value.trim()
    };
    produk.push(newItem);
    produkForm.reset();
    inputId.value = "";
    renderProduk();
  });
}

// katalog cards (used by katalog page)
export function renderKatalog(targetElement) {
  if (!targetElement) return;
  targetElement.innerHTML = "";
  produk.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card card-product h-100">
        <div class="card-body text-center">
          <h5 class="card-title">${p.nama}</h5>
          <p class="card-text">Stok: ${p.stok}</p>
          <p class="price">Rp ${p.harga.toLocaleString('id-ID')}</p>
          <p class="card-text text-muted">${p.deskripsi}</p>
        </div>
      </div>
    `;
    targetElement.appendChild(col);
  });
}

// initial render when module loaded on product page
renderProduk();



