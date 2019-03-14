const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let trainers, pokemon;

document.addEventListener('DOMContentLoaded', buildPokemonCards)

function buildPokemonCards() {
  getTrainers()
    .then(trainers => {
      trainers.forEach(trainer => buildCard(trainer));
    });
}


function getTrainers() {
  return fetch(TRAINERS_URL)
    .then(response => response.json());
}


function buildCard(trainer) {
  const main = document.querySelector("main");
  const displayCard = buildTrainerCard(trainer);

  main.appendChild(displayCard);
}


function buildTrainerCard(trainer) {
  const trainerCard = document.createElement("div");
  trainerCard.className = "card";
  trainerCard.id = trainer.id;

  const trainerName = document.createElement("p");
  trainerName.innerHTML = trainer.name;

  const pokemonContainer = document.createElement("ul");
  pokemonContainer.id = `trainer-${trainer.id}-pokemon-container`

  trainerCard.appendChild(trainerName);
  trainerCard.appendChild(buildAddPokemonButton(trainer));

  trainerCard.appendChild(pokemonContainer);

  trainer.pokemons.forEach(pokemon => {
    pokemonContainer.appendChild(buildPokemonLi(pokemon));
  })

  return trainerCard;
}


function buildAddPokemonButton(trainer) {
  const addPokemonButton = document.createElement("button");

  addPokemonButton.innerHTML = "Add Pokemon";
  addPokemonButton.id = trainer.id;

  addPokemonButton.addEventListener('click', addPokemon);

  return addPokemonButton;
}


function buildPokemonLi(pokemon) {
  const pokemonItem = document.createElement("li");
  
  const pokemonName = document.createElement("p");
  pokemonName.innerHTML = `${pokemon.nickname} (${pokemon.species})`;

  const pokemonReleaseButton = buildReleasePokemonButton(pokemon);

  pokemonItem.appendChild(pokemonName);
  pokemonItem.appendChild(pokemonReleaseButton);

  return pokemonItem;
}


function buildReleasePokemonButton(pokemon) {
  const releaseButton = document.createElement("button");
  releaseButton.className = "release"
  releaseButton.innerHTML = "Release";
  releaseButton.dataset.pokemon_id = pokemon.id;

  releaseButton.addEventListener('click', releasePokemon);

  return releaseButton;
}

function addPokemon(event) {
  const addPokemonButton = event.target;
  const pokemonCollection = addPokemonButton.nextElementSibling;

  console.log(event);
  
  // // take event
  postPokemon(addPokemonButton.id)
    .then(pokemon => {
      if (pokemon.error) alert(pokemon.error);
      else pokemonCollection.appendChild(buildPokemonLi(pokemon));
      })
}

function releasePokemon(event) {
  const pokemonLi = event.target.parentNode;
  pokemonLi.parentNode.removeChild(pokemonLi);
}


// Request Functions
function postPokemon(trainerId) {
  // trainer id -> 
  // return fetch promise
  const requestConfig = {
    method: "POST",
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'trainer_id': trainerId})
  }

  return fetch(POKEMONS_URL, requestConfig)
    .then(request => request.json());
}

const createPokemon = (trainerId) => {
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': trainerId
    })
  })
  .then(res => res.json())
}

function deletePokemon() {

}