// main_produk.js
import { renderKatalog } from "./controller_produk.js";
import { produk } from "./data_produk.js";

// Katalog page: render cards if katalogList exists
const katalogList = document.getElementById("katalogList");
if (katalogList) {
  renderKatalog(katalogList);
}
