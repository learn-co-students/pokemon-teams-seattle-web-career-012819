const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let POKEMON = []
let TRAINERS = []
const main = document.getElementById('main')
// <div class="card" data-id="1">
//  <p>Prince</p>
//  <button data-trainer-id="1">Add Pokemon</button>
//  <ul>
//    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//  </ul>
// </div>
fetchTrainers();

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(result => {
  return result.json()
  })
  .then(json => {
  TRAINERS = json
  console.log('Trainers fetched')
  buildPage();
  });

}

function buildPage(){
  TRAINERS.forEach(buildTrainerCard)
}

function buildTrainerCard(trainer) {
  console.log('building trainer', trainer.name)
  const encapsulatingDiv = document.createElement('div');
  const ul = document.createElement('ul');
  const trainerName = document.createElement('p');
  const addButton = document.createElement('button');

  trainerName.textContent = trainer.name

  addButton.textContent = "add pokémon"
  addButton.addEventListener('click',() => {
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({trainer_id: trainer.id})
    })
    .then(response => {
      if (response.ok) {
        return response.json() //we only get here if there is no error
      }else{
        throw new Error('Only 6 pokemon per trainer!')
      }
    })
    .then(json => {
      buildPokemonLi(json, ul)
      // console.log("new pokemon", newPokemonLi)
    })
    .catch(err => {
      console.log(err);
    });
  });



  main.appendChild(encapsulatingDiv);

  encapsulatingDiv.appendChild(trainerName);
  encapsulatingDiv.appendChild(addButton);
  encapsulatingDiv.appendChild(ul);

  buildPokemonUl(trainer,ul)

  encapsulatingDiv.className = "card";
}

function buildPokemonUl(trainer, ul) {
  trainer.pokemons.forEach((pokemon) => {
    // debugger
    buildPokemonLi(pokemon, ul);
  })
}

function buildPokemonLi(pokemon, ul) {
  let li = document.createElement('li');
  let removeButton = document.createElement('button');

  removeButton.textContent = "release"
  removeButton.className = "release"
  li.textContent = `${pokemon.nickname} (${pokemon.species}) `;

  li.appendChild(removeButton);
  ul.appendChild(li);

  removeButton.addEventListener('click',() => {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
      method: 'DELETE',
    })
    li.remove();
  })
}
