const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

//Fetch Trainers
fetch(TRAINERS_URL)
	.then((response) => {
		return response.json();
	})
	.then((json) => {
		//Card Attributes

		//Trainer Level
		json.forEach((trainer) => {
			const trainerName = trainer.name;
			const pokemonArray = trainer.pokemons;

			//Add Pokemon Button
			//Create Pokemon Button
			const addPokemonButton = document.createElement('button');
			addPokemonButton.textContent = 'Add Pokemon';
			const pokemonUl = document.createElement('ul');

			//Add Pokemon Button Event Listener
			addPokemonButton.addEventListener('click', (ev) => {
				fetch(POKEMONS_URL, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ trainer_id: trainer.id })
				})
					.then((response) => response.json())
					.then((json) => {
						// add to DOM
						console.log('pokemon:', json);
						const releaseButton = document.createElement('button');
						releaseButton.className = 'release';
						releaseButton.textContent = 'Release';
						const li = document.createElement('li');
						li.textContent = `${json.nickname} (${json.species})`;
						pokemonUl.appendChild(li);
						li.appendChild(releaseButton);
						card.appendChild(pokemonUl);

					});
			});

			//HTML Interactions - Trainer Level
			const main = document.getElementById('main');
			const card = document.createElement('div');
			card.className = 'card';
			main.appendChild(card);
			const p = document.createElement('p');
			p.textContent = trainerName;
			card.appendChild(p);
			card.appendChild(addPokemonButton);

			//Pokemon Level
			pokemonArray.forEach((pokemonObj) => {
				const pokeNickname = pokemonObj.nickname;
				const pokeSpecies = pokemonObj.species;

				//Create Release Button
				const releaseButton = document.createElement('button');
				releaseButton.className = 'release';
				releaseButton.textContent = 'Release';
				releaseButton.setAttribute('id', pokemonObj.id);
				const li = document.createElement('li');
				li.textContent = `${pokeNickname} (${pokeSpecies})`;
				pokemonUl.appendChild(li);
				li.appendChild(releaseButton);
				card.appendChild(pokemonUl);

				//Release Pokemon Button Listener
				releaseButton.addEventListener('click', () => {
					console.log(event);
					fetch(POKEMONS_URL + '/' + pokemonObj.id, {
						method: 'DELETE'
					})
						.then((response) => response.json())
						.then((json) => console.log(json))
						.then(() => li.remove())
						.catch(() => console.log('Already removed!!!!'));
				});
			});
		});
	});
