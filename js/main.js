import { getAll, getById, removeById, updateById } from "./services.js";
import { getParams, render } from "./utils.js";

const { products } = await getAll("products");

const hotSaleSection = document.getElementById("hot-sale");

render(hotSaleSection, products);

const productId = getParams("id");

const product = await getById("products", productId);
