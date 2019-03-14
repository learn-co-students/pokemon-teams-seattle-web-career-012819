window.addEventListener('load', getTrainerData)
//window.addEventListener('load', getPokemonData)

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getTrainerData() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => {
      json.forEach(trainer => {
          createTrainerCard(trainer)
          console.log(trainer.name)
          console.log(trainer.pokemons)
      })
    })
  }


 function createTrainerCard(trainer) {
   let main = document.querySelector('main')
   let card = document.createElement('div')
   card.className = 'card'
   card.setAttribute('data-id', trainer.id)
   let p = document.createElement('p')
   p.textContent = trainer.name

   let button = document.createElement('button')
   button.textContent = "Add Pokemon"
   button.addEventListener('click', () => addPokemon(trainer))
   button.setAttribute('data-trainer-id', trainer.id)
   let ul = document.createElement('ul')
   pokemonListItems(ul, trainer)

   main.appendChild(card)
   card.appendChild(p)
   card.appendChild(button)
   card.appendChild(ul)

 }

 function pokemonListItems(ul, trainer) {
   trainer.pokemons.forEach(pokemon => {
     let li = document.createElement('li')
     let button = document.createElement('button')
     li.textContent = pokemon.nickname + " (" + pokemon.species +")"
     button.textContent = 'Release'
     button.className = 'release'
     button.setAttribute('data-pokemon-id', pokemon.id)

     button.addEventListener('click', () => {
       li.remove()
       removePokemon(pokemon)
     })
     li.appendChild(button)
     ul.appendChild(li)
   })
 }

 function addPokemon(trainer) {
   let id = trainer.id;

   fetch(POKEMONS_URL, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
    body: JSON.stringify({
      'trainer_id': id
    })
    })
    .then(response => response.json())
    .then(json => {
      let newPokemon = json
      trainer['pokemons'].push(newPokemon)
    })
    location.reload();
 }

 function removePokemon(pokemon) {
   let id = pokemon.id;

   fetch(POKEMONS_URL + '/' + id, {
     method: 'DELETE',
    })
    location.reload();
 }
