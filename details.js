const PexelsUrl = "https://api.pexels.com/v1/photos/";
const MyApiKey = "aUpAfUr4xC1sJSwaUgizPrCcOjXrsfZi9oMs9GI5vv6uWd6AO9bG8LW4";

const fillDetailsPage = function (imageDetails) {
  let colContent = `
          <img src=${imageDetails.src.large} style="max-height: 75vh"/>
          <div class="mt-2">
            <a href=${imageDetails.photographer_url}>${imageDetails.photographer}</a>
          </div>
          <div class="mt-2">
            <a href="./pexels-start.html">INDIETRO</a>
          </div>
      `;
  let colToFill = document.querySelector(".col-12.col-md-8");
  colToFill.innerHTML = colContent;
};

const getSingleImage = function () {
  let photoIdFromAddressBar = new URLSearchParams(window.location.search).get("photoId");
  fetch(PexelsUrl + photoIdFromAddressBar, {
    headers: {
      authorization: MyApiKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error getting single image details");
      }
    })
    .then((singleImageDetails) => {
      console.log("SINGLE IMAGE DETAILS", singleImageDetails);
      fillDetailsPage(singleImageDetails);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = function () {
  getSingleImage();
};
