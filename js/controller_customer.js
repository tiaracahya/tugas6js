import { customers } from "./data_customer.js";

let editIndex = null;

const index = () => {
  const tbody = document.getElementById("customerTable");
  tbody.innerHTML = "";

  customers.forEach((cust, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${cust.nama}</td>
      <td>${cust.umur}</td>
      <td>${cust.alamat}</td>
      <td>${cust.telepon}</td>
      <td>${cust.email}</td>
      <td>
        <button class="btn btn-warning btn-sm btn-edit">Edit</button>
        <button class="btn btn-danger btn-sm btn-delete">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);

    // Tombol edit
    tr.querySelector(".btn-edit").addEventListener("click", () => editUser(i));

    // Tombol hapus
    tr.querySelector(".btn-delete").addEventListener("click", () => deleteUser(i));
  });
};

const store = (newCust) => {
  customers.push(newCust);
  index();
};

const deleteUser = (indexCust) => {
  customers.splice(indexCust, 1);
  index();
};

const editUser = (indexCust) => {
  editIndex = indexCust;
  const cust = customers[indexCust];
  document.getElementById("customerId").value = cust.id || "";
  document.getElementById("c_nama").value = cust.nama;
  document.getElementById("c_umur").value = cust.umur;
  document.getElementById("c_alamat").value = cust.alamat;
  document.getElementById("c_telepon").value = cust.telepon;
  document.getElementById("c_email").value = cust.email;
};

const updateUser = (indexCust, newData) => {
  customers[indexCust] = newData;
  index();
  editIndex = null;
};

// Export
export { index, store, deleteUser, editUser, updateUser, editIndex };