const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers` // only GET /trainers
const POKEMONS_URL = `${BASE_URL}/pokemons` // only POST /pokemons & DELETE /pokemons/:id

// Requirements
// - (DONE) When a user loads the page, they should see all trainers, with their current team of Pokemon.
// - (DONE) Whenever a user hits Add Pokemon and they have space on their team (6 max), they should get a new Pokemon.
// - (DONE) Whenever a user hits Release Pokemon on a specific Pokemon team, that specific Pokemon should be released from the team.
// - (TO-DO) real error handling

let TRAINER_DATA = {}
fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json =>{
    TRAINER_DATA = json
    for (trainer of TRAINER_DATA) {
      createTrainerCard(trainer)
    }
  })

function createTrainerCard(data) {
  let main = document.querySelector('main')
  let ul = document.createElement('ul')

  // build div
  let tCard = document.createElement('div')
  tCard.className = 'card'
  tCard.setAttribute('data-id', data.id)

  // build p
  let tName = document.createElement('p')
  tName.innerText = data.name

  // build button
  let button = document.createElement('button')
  button.setAttribute('data-trainer-id', data.id)
  button.innerText = 'Add Pokemon'

  button.addEventListener('click', () => {
    fetchNewPoke(data.id, ul)
    })

  //build li's
  for (poke of data.pokemons) {
    addPokeToCard(ul, poke)
  }

  // append all the things
  tCard.appendChild(tName)
  tCard.appendChild(button)
  tCard.appendChild(ul)
  main.appendChild(tCard)

}

function addPokeToCard(ul, data) {
  let li = document.createElement('li')
  li.innerText = `${data.nickname} (${data.species})`

  let button = document.createElement('button')
  button.innerText = 'Release'
  button.className = 'release'
  button.setAttribute('data-pokemon-id', data.id)

  button.addEventListener('click', () => {
    deletePoke(data.id, li)
  })

  ul.appendChild(li)
  li.appendChild(button)
}

function deletePoke(poke_id, li) {
  let poke = {'id': poke_id}
  let bodyJSON = JSON.stringify(poke)

  fetch(POKEMONS_URL + '/' + poke.id, {
    method: 'DELETE',
    headers: {"Content-Type": "application/json"},
    body: bodyJSON
  })
    .then(response => response.json())
    .then(json =>  li.remove())
}

function fetchNewPoke(trainer_id, ul) {
  let trainer = {'trainer_id': trainer_id}
  let bodyJSON = JSON.stringify(trainer)

  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {"Content-Type": "application/json"} ,
    body: bodyJSON
  })
    .then(response => response.json())
    .then(json => {

      if (json.error) {
        alert(json.error )
      } else {
        let newPoke = json
        addPokeToCard(ul, newPoke)
      }
    })
}
