const characterList = document.querySelector(".character-list");
const prev_button = document.querySelector(".prev");
const next_button = document.querySelector(".next");
let pageNumber = 1;

const getPeople = async (page) => {
  characterList.innerHTML = `<div class="loader-container"><div class="loader"></div></div>`;
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const characters = await response.json();
  characterList.innerHTML = "";
  characters.results.forEach((item) => {
    const randomId = Math.floor(Math.random() * 1000000);
    const randomVehicleId = Math.floor(Math.random() * 1000000);
    const vehicles = item.vehicles;

    characterList.innerHTML += `
    <div class="character-item"> 
      <h1 class="char-name">${item.name}</h1>
      <p><strong>Height:</strong> ${item.height}</p>
      <p><strong>Mass:</strong> ${item.mass}</p>
      <p><strong>Gender:</strong> ${item.gender}</p>
      <p><strong>Birth Year:</strong> ${item.birth_year}</p>
      <p><strong>Hair Color:</strong> ${item.hair_color}</p>
      <p><strong>Eye Color:</strong> ${item.eye_color}</p>
      
      <div class="button-container">
        <button class="more-info-btn" onclick="document.getElementById('${randomId}').showModal()">
          More Info
        </button> 
      </div>

      <dialog id=${randomId}>
        <h1 class="char-name">${item.name}<span id="light-logo"> Vehicles</span></h1>
        <div class="vehicle-container" id=${randomVehicleId}></div>
        <button class="close more-info-btn" onclick="document.getElementById('${randomId}').close()">Ok</button>
      </dialog>
    </div>
    `;

    if (vehicles.length === 0) {
      document.getElementById(randomVehicleId).innerHTML += `
      <div class="character-item">
        <h3 class="vehicle-name">No vehicles found for this character.</h3>
      </div>
      `;
    }

    vehicles.forEach((vehicle) => {
      fetch(vehicle)
        .then((response) => response.json())
        .then((data) => {
          document.getElementById(randomVehicleId).innerHTML += `
          <div class="character-item"> 
            <h3 class="vehicle-name">${data.name}</h3>
            <p><strong>Model:</strong> ${data.model}</p>
            <p><strong>Manufacturer:</strong> ${data.manufacturer}</p>
            <p><strong>Cost:</strong> ${data.cost_in_credits}</p>
            <p><strong>Length:</strong> ${data.length}</p>
            <p><strong>Max Speed:</strong> ${data.max_atmosphering_speed}</p>
            <p><strong>Crew:</strong> ${data.crew}</p>
            <p><strong>Passengers:</strong> ${data.passengers}</p>
            <p><strong>Cargo Capacity:</strong> ${data.cargo_capacity}</p>
            <p><strong>Vehicle Class:</strong> ${data.vehicle_class}</p>
          </div>
          `;
        });
    });
  });

  return characters.count;
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
