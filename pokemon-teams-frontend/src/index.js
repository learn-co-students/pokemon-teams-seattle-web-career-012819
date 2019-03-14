const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
let TRAINERS = [];

// {
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
// }

// {
//   "id": 1,
//   "name": "Prince",
//   "pokemons": [
//     {
//       "id": 1,
//       "nickname": "Roxanne",
//       "species": "Raticate",
//       "trainer_id": 1
//     },
fetch(TRAINERS_URL)
	.then((response) => response.json())
	.then((json) => {
		json.forEach((trainer) => {
			TRAINERS.push(trainer);
		});
	})
	.then(function() {
		createTrainerCards();
	});

// function pokemonListItem(ul, pokemon) {
// 	let li = document.createElement('li');
// 	let button = document.createElement('button');
// 	li.textContent = pokemon.nickname;
// 	button.textContent = 'Release';
// 	button.onlick = function() {
// 		li.remove();
// 	};
// 	li.appendChild(button);
// 	ul.appendChild(li);
// }

function createTrainerCards() {
	TRAINERS.forEach((trainer) => {
		console.log('creating Trainer card!');
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
			let releaseButton = document.createElement('button');
			releaseButton.textContent = 'Release';
			releaseButton.className = 'release';
			li.textContent = `${pokemon.nickname} (${pokemon.species})`;
			ul.appendChild(li);
			li.appendChild(releaseButton);
		});
		cards.appendChild(card);
		card.appendChild(cardName);
		card.appendChild(button);
		card.appendChild(ul);
	});
}
