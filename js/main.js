import { getAll, searchProducts } from "./services.js";
import { render } from "./utils.js";

const beautySection = document.getElementById("beauty");
const fragrancesSection = document.getElementById("fragrances");
const groceriesSection = document.getElementById("groceries");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResultsSection = document.getElementById("search-results");
const searchResultsList = searchResultsSection.querySelector(".product-list");

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

    searchResultsSection.style.display = "block";
    beautySection.style.display = "none";
    fragrancesSection.style.display = "none";
    groceriesSection.style.display = "none";

    searchResultsList.innerHTML = "";

    render(searchResultsList, products);
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", handleSearch);

AllProducts();
