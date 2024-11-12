import { getAll, searchProducts } from "./services.js";
import { getParams, render } from "./utils.js";

const categoryEle = document.getElementById("category");
const title = document.getElementById("title");
const searchForm = document.querySelector(".search form");
const searchInput = document.querySelector(".search input");
const sortSelect = document.getElementById("sort-select");
const priceFilter = document.getElementById("price-filter");

let result = [];

const param = getParams("category");
if (param) {
  title.innerText = `${param}`.toUpperCase();
  const { products } = await getAll(`products/category/${param}`);
  result = products;
  render(categoryEle, result);
} else {
  title.innerText = "ALL PRODUCTS";
  const { products } = await getAll("products");
  result = products;
  render(categoryEle, result);
}

async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  const { products } = await searchProducts(query);
  title.innerText = `Kết quả tìm kiếm cho "${query}"`.toUpperCase();
  result = products;
  render(categoryEle, result);
}
searchForm.addEventListener("submit", handleSearch);

function sortProducts(products, criteria) {
  switch (criteria) {
    case "name-asc":
      return products.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return products.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return products.sort((a, b) => a.price - b.price);
    case "price-desc":
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
}

function filterByPrice(products, range) {
  switch (range) {
    case "under-100":
      return products.filter((product) => product.price < 100);
    case "100-300":
      return products.filter(
        (product) => product.price >= 100 && product.price <= 300
      );
    case "300-1000":
      return products.filter(
        (product) => product.price > 300 && product.price <= 1000
      );
    case "above-1000":
      return products.filter((product) => product.price > 1000);
    default:
      return products;
  }
}

sortSelect.addEventListener("change", () => {
  const sortedProducts = sortProducts([...result], sortSelect.value);
  const filteredProducts = filterByPrice(sortedProducts, priceFilter.value);
  render(categoryEle, filteredProducts);
});

priceFilter.addEventListener("change", () => {
  const filteredProducts = filterByPrice([...result], priceFilter.value);
  const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
  render(categoryEle, sortedProducts);
});
