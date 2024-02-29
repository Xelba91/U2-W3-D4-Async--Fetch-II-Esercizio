const PexelsUrl = "https://api.pexels.com/v1/search?query=";
const MyApiKey = "aUpAfUr4xC1sJSwaUgizPrCcOjXrsfZi9oMs9GI5vv6uWd6AO9bG8LW4";

//funzione per nascondere una card
const hideColumn = function (context) {
  let rightColToDelete = context.closest(".col-md-4");
  rightColToDelete.remove();
};

const renderCards = function (photos) {
  let row = document.querySelector(".album .container .row");
  row.innerHTML = "";
  photos.forEach((photo) => {
    let colTemplate = `
      <div class="col-md-4">
          <div class="card mb-4 h-100  shadow-sm">
          <a href="./details.html?photoId=${photo.id}">
              <img class= "card-img-top" src=${photo.src.small}}  />
          </a>
              <div class="card-body">
              <a href="./details.html?photoId=${photo.id}">
                  <h5 class="card-title">${photo.photographer}</h5>
              </a>
                  <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                  </p>
                  <div
                  class="d-flex justify-content-between align-items-center"
                  >
                  <div class="btn-group">
                      <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          
                      >
                          View
                      </button>
                      <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      onclick="hideColumn(this)"
                      >
                      Hide
                      </button>
                  </div>
                  <small class="text-muted">${photo.id}</small>
                  </div>
              </div>
          </div>
      </div>
      `;
    row.innerHTML += colTemplate;
  });
};

const getImages = function (query) {
  fetch(PexelsUrl + query, {
    headers: {
      authorization: MyApiKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error getting the images");
      }
    })
    .then((data) => {
      console.log(data);
      renderCards(data.photos);
    })
    .catch((err) => {
      console.log(err);
    });
};

let primaryButton = document.querySelector(".btn-primary");
primaryButton.addEventListener("click", () => {
  getImages("moon");
});

let secondaryButton = document.querySelector(".btn-secondary");
secondaryButton.addEventListener("click", () => {
  getImages("gaming");
});

//per la barra di ricerca
let customInputField = document.querySelector(".input-group .form-control");
let customSearchButton = document.querySelector(".input-group .btn-outline-secondary");
customSearchButton.addEventListener("click", () => {
  getImages(customInputField.value);
});
// window.onload = function () {
//   getImages("nvidia");
// };

document.addEventListener("DOMContentLoaded", function () {
  getImages("nvidia");
});
