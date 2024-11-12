import { getAll, getById, searchProducts } from "./services.js";
import { getParams, render } from "./utils.js";

const beautySection = document.getElementById("beauty");
const fragrancesSection = document.getElementById("fragrances");
const groceriesSection = document.getElementById("groceries");
const searchForm = document.querySelector(".search form");
const searchInput = document.querySelector(".search input");

async function AllProducts() {
  try {
    const { products } = await getAll("products");
    console.log(products);

    const beautyProducts = products.filter(
      (item) => item.category === "beauty"
    );
    const fragrancesProducts = products.filter(
      (item) => item.category === "fragrances"
    );
    const groceriesProducts = products.filter(
      (item) => item.category === "groceries"
    );

    render(beautySection, beautyProducts);
    render(fragrancesSection, fragrancesProducts);
    render(groceriesSection, groceriesProducts);
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
