import { index, store, updateUser, editIndex } from "./controller_customer.js";

const main = () => {
  // Tampilkan data awal dari data_customer.js
  index();

  const form = document.getElementById("customerForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newCust = {
      id: Date.now(),
      nama: document.getElementById("c_nama").value,
      umur: parseInt(document.getElementById("c_umur").value),
      alamat: document.getElementById("c_alamat").value,
      telepon: document.getElementById("c_telepon").value,
      email: document.getElementById("c_email").value
    };

    if (editIndex === null) {
      store(newCust); // tambah baru
    } else {
      updateUser(editIndex, newCust); // update data
    }

    form.reset();
  });
};

// Jalankan
main();

