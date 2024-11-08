import { getAll, searchProducts } from "./services.js";
import { getParams, render } from "./utils.js";

const categoryEle = document.getElementById("category");
const title = document.getElementById("title");
const searchForm = document.querySelector(".search form");
const searchInput = document.querySelector(".search input");

const param = getParams("category");
if (param) {
  title.innerText = `${param}`.toUpperCase();
  const { products } = await getAll(`products/category/${param}`);
  render(categoryEle, products);
} else {
  title.innerText = "ALL PRODUCTS";
  const { products } = await getAll("products");
  render(categoryEle, products);
}

async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  const { products } = await searchProducts(query);
  title.innerText = `Kết quả tìm kiếm cho "${query}"`.toUpperCase();

  categoryEle.innerHTML = "";
  render(categoryEle, products);
}
searchForm.addEventListener("submit", handleSearch);
