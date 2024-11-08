import { getAll, getById, searchProducts } from "./services.js";
import { getParams, render } from "./utils.js";

const hotSaleSection = document.getElementById("hot-sale");
const searchForm = document.querySelector(".search form");
const searchInput = document.querySelector(".search input");

async function AllProducts() {
  try {
    const { products } = await getAll("products");
    render(hotSaleSection, products);
  } catch (error) {
    console.log(error);
  }
}

async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const { products } = await searchProducts(query);
    hotSaleSection.innerHTML = "";
    render(hotSaleSection, products);
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", handleSearch);

AllProducts();
