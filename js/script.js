const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 1292;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++){
        await getPokemonsAPI(i);
    }
}

const getPokemonsAPI = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
    //createModalPokemon(data);
    //console.log(data);
}

const createPokemonCard = (poke) => {
    const card = document.createElement("div");
    card.classList.add("pokemon");
    
    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > - 1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">                
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `
    card.innerHTML = pokemonInnerHTML;
    pokeContainer.appendChild(card);
}

fetchPokemons();

//Modal:
const modal = document.querySelector("dialog");
const closeModal = document.querySelector("dialog button");

closeModal.onclick = function () {
    modal.close();
}

const createModalPokemon = (poke) => {
    const createModal = document.createElement("dialog");

    const pokeName = poke.name[0].toUpperCase() + poke.name.slice(1);
    const pokeAltura = poke.height.toString();
    const pokePeso = poke.weight.toString();
    const pokeXP = poke.base_experience.toString();
    pokeXP == null ? '0' : poke.base_experience.toString();
    
    const modalInnerHTML = `
    <h1 id="pokename">${pokeName}</h1>
    <p class="pokeatributos">Altura: ${pokeAltura}</p>
    <p class="pokeatributos">Peso: ${pokePeso}</p>
    <p class="pokeatributos">Habilidades:</p>
    <p class="pokeatributos">Experiência de base: ${pokeXP}</p>

    <button>Close</button>
    `
    modal.innerHTML = modalInnerHTML;
    createModal.appendChild(modal);
}