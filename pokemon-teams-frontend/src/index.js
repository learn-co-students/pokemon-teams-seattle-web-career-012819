const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const TRAINERS = []
const POKEMONS = []

// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>

//fetch the thing

fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => {
    json.forEach((trainer => {
      TRAINERS.push(trainer)
    }))
  })
  .then(function() {
    createTrainerCards();
  })

// fetch(POKEMONS_URL + `/:${pokemon_id}`, {
//   method: "DELETE",
//
// })
//   .then(response => response.json())
//   .then(json => {
//     json.forEach((pokemon => {
//       POKEMONS.push(pokemon)
//     }))
//   })

function createTrainerCards() {
    TRAINERS.forEach((trainer) => {
        let cards = document.getElementById('cards');
        let card = document.createElement('div');
        card.className = 'card';

        let button = document.createElement('button');
        button.textContent = 'Add Pokemon';

        let ul = document.createElement('ul');
        let cardName = document.createElement('p');
        cardName.textContent = trainer.name;

        trainer.pokemons.forEach((pokemon) => {
            let li = document.createElement('li');
            li.textContent = `${pokemon.nickname} (${pokemon.species})`;

            let releaseButton = document.createElement('button');
            releaseButton.textContent = 'Release';
            releaseButton.className = 'release';

            releaseButton.addEventListener('click', (e) => {
              releasePokemon(e); 
            })

            li.appendChild(releaseButton);
            ul.appendChild(li);


        });

        cards.appendChild(card);
        card.appendChild(cardName);
        card.appendChild(button);
        card.appendChild(ul);
    });
}

function releasePokemon(e) {
    fetch(`${POKEMONS_URL}/${e.target.id}`, {
        method: 'delete'
    }).then(() => e.target.parentNode.remove());
}

// function pokemonListItem(ul, pokemonId) {
//   let li = document.createElement('li')
//   let button = document.createElement('button')
//
//   li.textContent = POKEMON_LOOKUP(pokemonId)
//   button.textContent = 'Release Pokemon'
//
//   button.onclick = function() {
//     li.remove()
//   }
//
//   li.appendChild(button)
//   ul.appendChild(li)
//
// }
