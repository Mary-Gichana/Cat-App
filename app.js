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
            
            <img src="${cat.image_url}" alt="${cat.breedName}" width="200">
            <p>${cat.Coat}</p>
            <div>
            <form class = "comment-Form" data.id= ${cat.id}>
              <input type="text" placeholder="Enter your comment">
              <button id= btn>submit</button>
            </form>
            <ul class="comment-list" id="comments-${cat.id}"></ul>
            </div>
        `;

      const likeIcon = document.createElement("i");
      likeIcon.classList.add("fas", "fa-heart", "like-icon");

      likeIcon.addEventListener("click", () => {
        if (likeIcon.classList.contains("liked")) {
          likeIcon.classList.remove("liked");
        } else {
          likeIcon.classList.add("liked");
        }
      });

      catCard.appendChild(likeIcon);
      catsDiv.appendChild(catCard);
    });
  }

  inputBox.addEventListener("input", (event) => {
    const searchCat = event.target.value.toLowerCase();
    fetch("http://localhost:3000/cats")
      .then((response) => response.json())
      .then((cats) => {
        const filteredCats = cats.filter((cat) =>
          cat.breedName.toLowerCase().includes(searchCat)
        );

        displayCats(filteredCats);
      })
      .catch((error) => console.error("Error filtering cats:", error));
  });
});
