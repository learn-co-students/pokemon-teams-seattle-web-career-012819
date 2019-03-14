const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(response => response.json())
.then(json => {
  json.forEach(trainer => {
    // let info = {
    //   name: trainer['name'],
    //   id: trainer['id'],
    //   pokemonList: trainer['pokemons']
    // }
    createPokemonCard(trainer);
  })
});

//document.body.appendChild(main);
function createPokeList(info, ul) {

  for (const poke of info["pokemons"]) {
    let newLi = document.createElement("li");
    let releaseButton = document.createElement('button');
    newLi.textContent = `${poke["nickname"]}`;
    releaseButton.textContent = "Release";
    releaseButton.classList.add('release');
    newLi.appendChild(releaseButton);
    ul.appendChild(newLi);
  }
};

function createPokemonCard(info) {
  let main = document.getElementsByTagName('main')[0];
  let trainer = document.createElement('div');
  let p = document.createElement('p');
  let button = document.createElement('button');
  let ul = document.createElement('ul');

  p.textContent = `${info.name}`;
  button.textContent = "Add Pokemon";
  button.setAttribute('data-trainer-id', info['id'])
  button.addEventListener('click', (event) => {
    // prevent refresh
    event.preventDefault();

    const pokeBody = JSON.stringify({
      trainer_id: event.target.getAttribute('data-trainer-id')
    });
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: pokeBody
    })
    .then(response => response.json())
    .then(json => {
      createPokeList(json, ul);
      debugger
    })
  })

  createPokeList(info, ul);

  trainer.classList.add('card');
  trainer.appendChild(p);
  trainer.appendChild(button);
  trainer.appendChild(ul);
  main.appendChild(trainer);
}