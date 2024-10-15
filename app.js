document.addEventListener("DOMContentLoaded", () => {
  const catsDiv = document.getElementById("cats-Div");
  const inputBox = document.getElementById("search");

  fetch("http://localhost:3000/cats")
    .then((res) => res.json())
    .then((data) => displayCats(data))
    .catch((error) => console.log("Error displaying cats", error));

  function displayCats(cats) {
    catsDiv.innerHTML = "";

    cats.map((cat) => {
      const catCard = document.createElement("div");
      catCard.className = "cat-card";
      catCard.innerHTML = `
            <h3>${cat.breedName}</h3>
            <img src="${cat.image_url}" alt="${cat.breedName}" width="200">
            
        `;
      catsDiv.appendChild(catCard);
    });
  }
});
