const url = "https://dummyjson.com";
async function getAll(path) {
  try {
    const res = await fetch(`${url}/${path}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getById(path, id) {
  try {
    const response = await fetch(`${url}/${path}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function updateById(path, id, body) {
  try {
  } catch (error) {
    console.log(error);
  }
}

async function create(path, body) {
  try {
  } catch (error) {
    console.log(error);
  }
}

async function removeById(path, id) {
  try {
  } catch (error) {
    console.log(error);
  }
}
async function searchProducts(query) {
  try {
    const response = await fetch(`${url}/products/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getAll, getById, create, updateById, removeById, searchProducts };
