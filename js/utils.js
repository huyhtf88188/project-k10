export function getParams(key) {
  console.log(window.location.search);
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

export function render(target, datas) {
  const containerElement = document.createElement("div");
  containerElement.classList.add("container");
  const row = document.createElement("div");
  row.classList.add("row");
  datas.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");
    productElement.innerHTML = /*html*/ `
        <div class="product-card">
          <a href='/products-detail.html?id=${item.id}'><img src="${item.thumbnail}" alt="${item.title}" /></a>
          <div class="product-infor">
          <a href="/products-detail.html?id=${item.id}"> <h2>${item.title}</h2></a>
            <div>Giá: ${item.price}</div>
            <p>Mô tả: ${item.description}</p>
            <button><a href="/products-detail.html?id=${item.id}">Xem Chi Tiết</a></button>
          </div>
        </div>
    `;
    row.appendChild(productElement);
  });
  containerElement.appendChild(row);
  target && target.appendChild(containerElement);
}
