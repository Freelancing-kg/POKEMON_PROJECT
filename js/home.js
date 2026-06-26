document
.getElementById("searchInput")
.addEventListener("keydown", (event) => {

    if(event.key === "Enter"){
        fetchPokemon();
    }

});

const moveName = document.getElementById
const params = new URLSearchParams(window.location.search);

const pokemonName = params.get("pokemon");

if (pokemonName) {
    fetchPokemon(pokemonName);
}

async function fetchPokemon(name) {
    const container = document.getElementById("container");
    try {
        const pokemonInput =name ||document.getElementById("searchInput").value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;
        const responce = await fetch(url);
        const data = await responce.json();
        displayPokemon(data);
        container.style.display = "block"
    } 
    catch (error) {
        window.location.href = `error`;
        console.error('Error fetching Pokémon:', error);
    }   
}

function displayPokemon(data){
    // Update Pokémon Image
    const pokemonImage = document.querySelector('.pokemon-image-card img');
    pokemonImage.src = data.sprites.other['official-artwork'].front_default;
    // Update Pokémon Name
    const pokemonName = document.querySelector('.name-card h1');
    pokemonName.textContent = data.name.toUpperCase();
    // Update Pokémon ID
    const pokemonId = document.querySelector('.name-card p');
    pokemonId.textContent = `#${data.id.toString().padStart(3, '0')}`;
    //Update Pokémon Details
    const pokemonDetails = document.querySelector('.details-card p');
    pokemonDetails.textContent = `${data.height / 10} m`;
    const pokemonWeight = document.querySelector('.details-card .detail-item:nth-child(3    ) p');
    pokemonWeight.textContent = `${data.weight / 10} kg`;
    const pokemonType = document.querySelector('.details-card .detail-item:nth-child(4) p');
    pokemonType.textContent = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    const pokemonAbility = document.querySelector('.details-card .detail-item:nth-child(5) p');
    pokemonAbility.textContent = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
    // Update stats
    const statsContainer = document.querySelectorAll('.stats-card .stat .bar .fill');
    statsContainer.forEach((bar, index) => {
        const statValue = data.stats[index].base_stat;
        bar.style.width = `${(statValue / 255) * 100}%`;
        bar.querySelector('p').textContent = statValue;
    });
    //Update Moves
    const movesContainer = document.querySelector('.moves-container ');
    movesContainer.innerHTML = '';
    data.moves.forEach(moveInfo => {
        const moveElement = document.createElement('div');
        moveElement.classList.add('move-card');
        moveElement.textContent = moveInfo.move.name;
        movesContainer.appendChild(moveElement);
        moveElement.dataset.url = moveInfo.move.url;

        moveElement.addEventListener(
            "click",
            () => showMoveDetails(
                moveInfo.move.url
            )
        );
    });
    speciesFetch(data.species.url);    
}

async function speciesFetch(url){
    try{
        const responce = await fetch(url);
        const data = await responce.json();
        await fetchEvolutionChain(data.evolution_chain.url);
    }
    catch(error){
        console.error(error);
    }   
}

function getEvolutions(chain, evolutionLevels,level=0){
    // evolutionChain.push(chain.species.name);

    // chain.evolves_to.forEach(nextEvolution => {
    //     getEvolutions(nextEvolution, evolutionChain);
    
    // });
    if(!evolutionLevels[level]){
        evolutionLevels[level] = [];
        
    }

    evolutionLevels[level].push(
        chain.species.name
    );

    chain.evolves_to.forEach(nextEvolution => {
        getEvolutions(
            nextEvolution,
            evolutionLevels,
            level + 1
        );
    });
}

async function fetchEvolutionChain(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        let evolutionLevel = [];

        let currentChain = data.chain;

        getEvolutions(data.chain, evolutionLevel,0);

        pokemonEvolutinoImage(evolutionLevel);
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
    }
}

async function pokemonEvolutinoImage(levels){
    try{
        const evolutionChainContainer =
        document.getElementById("evolution-chain");

        evolutionChainContainer.innerHTML = '';
        let i=1;

        for (let level of levels) {

            const row = document.createElement('div');
            row.classList.add('evolution-row');

            evolutionChainContainer.appendChild(row);
            for (let name of level) {

                const url =
                    `https://pokeapi.co/api/v2/pokemon/${name}`;

                const response = await fetch(url);
                const data = await response.json();

                const divElement =
                    document.createElement('div');

                divElement.classList.add('evolution');

                divElement.innerHTML = `
                    <img
                        src="${data.sprites.other['official-artwork'].front_default}"
                        alt="${data.name}"
                    >
                    <p>${data.name}</p>
                `;
                divElement.addEventListener('click', () => {
                    fetchPokemon(data.name);
                });
                if(i<=levels.length-1){
                    const arrow = document.createElement('span');
                    arrow.classList.add('arrow');
                    arrow.innerHTML = '➜';
                    evolutionChainContainer.appendChild(arrow);
                }
                if(i==2 && levels.length === 3){
                    i++;
                }

                row.appendChild(divElement);
            }
            i++;
        }
    }
    catch(error){
        console.error(error);
    }
}

async function showMoveDetails(url){

    try{

        const response = await fetch(url);

        const data = await response.json();

        document.getElementById("moveName").textContent = data.name;

        document.getElementById("moveType").textContent = data.type.name;

        document .getElementById("movePower").textContent = data.power ?? "-";

        document.getElementById("moveAccuracy").textContent = data.accuracy ?? "-";

        document.getElementById("movePP").textContent = data.pp;

        document.getElementById("moveClass").textContent = data.damage_class.name;

        document.getElementById("moveEffect").textContent = 
        data.effect_entries.find(
                entry =>
                entry.language.name === "en"
            )?.effect || "No effect data";

        document.getElementById("moveModal").style.display = "block";

    }
    catch(error){

        console.error(error);

    }
}

document
.getElementById("closeModal")
.addEventListener("click", () => {

    document
        .getElementById("moveModal")
        .style.display = "none";

});
window.addEventListener("click", e => {

    const modal =
        document.getElementById(
            "moveModal"
        );

    if(e.target === modal){

        modal.style.display =
            "none";
    }

});

const movesDropDown = document.getElementById("movesDropDown");

const movesBtn = document.getElementById("dropDownBtn")

movesBtn.addEventListener("click", () => {
    if(
        movesDropDown.style.display === "grid"
    ){

        movesDropDown.style.display = "none";
        movesBtn.innerText = "▼ Moves"

    }else{

        movesDropDown.style.display = "grid";
        movesBtn.innerText = "▲ Moves"
    }
});

