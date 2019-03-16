const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
let TRAINERS = [];
let POKEMONS = [];

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

function addPokemon(e) {
	let target = e.target.id;
	fetch(POKEMONS_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ trainer_id: target })
	});
}

function releasePokemon(e) {
	fetch(`${POKEMONS_URL}/${e.target.id}`, {
		method: 'delete'
	}).then(() => e.target.parentNode.remove());
}

function createTrainerCards() {
	TRAINERS.forEach((trainer) => {
		console.log('creating Trainer card!');
		let cards = document.getElementById('cards');
		let card = document.createElement('div');
		card.className = 'card';

		let button = document.createElement('button');
		button.textContent = 'Add Pokemon';
		button.id = trainer.id;
		button.onclick = (e) => addPokemon(e);

		let ul = document.createElement('ul');
		let cardName = document.createElement('p');
		cardName.textContent = trainer.name;

		trainer.pokemons.forEach((pokemon) => {
			let li = document.createElement('li');
			let releaseButton = document.createElement('button');
			releaseButton.textContent = 'Release';
			releaseButton.className = 'release';
			releaseButton.id = pokemon.id;
			releaseButton.onclick = (e) => releasePokemon(e);

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
