const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 1008; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            abilities: result.abilities.map((ability) => ability.ability.name).join(', ')
        }));
        displayPokemon(pokemon);
    });
};


const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <a href="https://pokeapi.co/api/v2/pokemon/${pokeman.id}" target="_blank" rel="noopener noreferrer">
            <li class="card">
                <img class="card-image" src="${pokeman.image}"/>
                <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p class="card-subtitle">Type: ${pokeman.type}</p>
                <p class="card-abilities">Abilities: ${pokeman.abilities}</p>
            </li>
        </a>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
