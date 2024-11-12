import { getById } from "./services.js";
import { getParams } from "./utils.js";

const detailEle = document.getElementById("detail");
const reviewProduct = document.getElementById("reviews");

const id = getParams("id");
console.log(id);
const product = await getById("products", id);
console.log(product);
function renderDetail(target, data) {
  const productItem = document.createElement("div");
  productItem.classList.add("row");
  productItem.innerHTML = /*html*/ `
    <div class="col col-md-6">
        <img src="${data.thumbnail}" alt="${data.title}" />
      </div>
      <div class="col col-md-6">
        <h2>${data.title}</h2>
        <p>Giá: ${data.price}$</p>
        <p>Còn ${data.stock} sản phẩm</p>
        <div>
          <span>Chọn số lượng: </span> <input type="number" min=1 max=${data.stock} value="1"/>
        </div>
        <p>Danh mục: ${data.category}</p>
        <p>Chi tiết: ${data.description}</p>
        <button class="btn btn-danger">Mua ngay</button>
        <button class="btn btn-danger">Thêm Vào Giỏ Hàng</button>
        <hr>
        <h4>Đánh giá:</h4>
        <div id="reviews"></div>
    </div>
    `;
  target.appendChild(productItem);

  renderReviews(data.reviews);
}

function renderReviews(reviews) {
  const reviewsContainer = document.getElementById("reviews");

  if (!reviews || reviews.length === 0) {
    reviewsContainer.innerHTML = "<p>Chưa có đánh giá nào.</p>";
    return;
  }
  reviews.forEach((review) => {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item", "mb-3");
    reviewItem.innerHTML = `
      <p>Người đánh giá: ${review.reviewerName}</p>
      <p>Đánh giá: ${review.rating} / 5</p>
      <p>Bình luận: ${review.comment}</p>
      <hr>
    `;
    reviewsContainer.appendChild(reviewItem);
  });
}

renderDetail(detailEle, product);
