const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(TRAINERS_URL)
.then(response => response.json())
.then (json => {
   json.forEach(object => {
      createTrainerCard(object)

   })
}
)




function createTrainerCard(object){
   const random = document.querySelectorAll('main')[0]
   let trainerCardContainer = document.createElement('div')
   let pTag = document.createElement('p')
   let pokemonList = document.createElement('ul')
   let addPokemonButton = document.createElement('button')
   addPokemonButton.id = object.id
   addPokemonButton.textContent = "Add Pokemon"
   trainerCardContainer.className = "card"
   pTag.className = "name"
   console.log("Hi")
   random.append(trainerCardContainer)
   trainerCardContainer.append(pTag)
   trainerCardContainer.append(addPokemonButton)
   trainerCardContainer.append(pokemonList)
   pTag.textContent = object.name
   object.pokemons.forEach(obj => {
      createPokemonItem(pokemonList, obj.nickname, obj.species, obj.id)
   })

   addPokemonButton.addEventListener('click', () => {
   let body = {trainer_id: object.id}
   fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(json => {
         createPokemonItem(pokemonList, json.nickname, json.species)
      })
   });
}

function createPokemonItem(ul, name, species, trainerId){
   let li = document.createElement('li')
   let button = document.createElement('button')
   button.className = 'release'
   button.id = trainerId
   li.textContent = `${name} (${species})`
   button.textContent = "Remove"
   li.append(button)
   ul.append(li)

   button.addEventListener('click', (event) => {
      li.remove()
      let body = {id: event.target.id}
      fetch(`${POKEMONS_URL}/${event.target.id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(res => console.log(res))
   })

}