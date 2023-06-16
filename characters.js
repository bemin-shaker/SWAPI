const characterList = document.querySelector(".character-list");
const prev_button = document.querySelector(".prev");
const next_button = document.querySelector(".next");
let pageNumber = 1;

const getPeople = async (page) => {
  characterList.innerHTML = `<div class="loader-container"><div class="loader"></div></div>`;
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const posts = await response.json();
  characterList.innerHTML = "";
  posts.results.forEach((post) => {
    characterList.innerHTML += `
    <div class="character-item"> 
      <h1 class="char-name">${post.name}</h1>
      <p><strong>Height:</strong> ${post.height}</p>
      <p><strong>Mass:</strong> ${post.mass}</p>
      <p><strong>Gender:</strong> ${post.gender}</p>
      <p><strong>Birth Year:</strong> ${post.birth_year}</p>
      <p><strong>Hair Color:</strong> ${post.hair_color}</p>
      <p><strong>Eye Color:</strong> ${post.eye_color}</p>
    </div>
    `;
  });

  return posts.count;
};

getPeople(1);

if (pageNumber === 1) {
  prev_button.style.display = "none";
}

prev_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (pageNumber > 1) {
    pageNumber--;
    if (pageNumber === 1) {
      prev_button.style.display = "none";
    }
    getPeople(pageNumber);
    prev_button.style.display = "block";
  } else if (pageNumber < 2) {
    prev_button.style.display = "none";
  }
});

next_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (pageNumber < 9) {
    pageNumber++;
    getPeople(pageNumber);
    prev_button.style.display = "block";
  } else {
    next_button.style.display = "none";
  }
});
