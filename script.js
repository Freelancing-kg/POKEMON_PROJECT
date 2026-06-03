
async function fetchPokemon(){
    try{
        const pokemonInput = document.getElementById("searchInput").value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

        const responce = await fetch(url);
        if(!responce.ok){
            throw new Error("Pokemon not found");
            
        }
        const data = await responce.json();
        displayPokemon(data);
    }
    catch(error){
        console.error(error);    
        const pokemonContainer = document.getElementById("pokemonContainer");
        pokemonContainer.style.display = "flex";
        pokemonContainer.textContent = "Pokemon not found. Please try again.";
    }
    
}

function displayPokemon(data){
    const pokemonImage = document.getElementById("pokemonImage");
    const pokemonName = document.getElementById("pokemonName");
    const pokemonAbilitys = document.getElementById("pokemonAbilitys");

    pokemonImage.src = data.sprites.front_default;
    pokemonName.textContent = data.name;
    const pokemonTypeContainer = document.getElementById("pokemonTypeContainer");
    pokemonTypeContainer.innerHTML = "";
    data.types.forEach(type => {
        const typeElement = document.createElement("p");
        typeElement.classList.add("pokemonType");
        typeElement.textContent = type.type.name;
        pokemonTypeContainer.appendChild(typeElement);
    });
    pokemonAbilitys.innerHTML = "";
    data.abilities.forEach(ability => {
        const abilityElement = document.createElement("p"); 
        abilityElement.classList.add("ability");
        abilityElement.textContent = ability.ability.name;
        pokemonAbilitys.appendChild(abilityElement);
    });

    const pokemonContainer = document.getElementById("pokemonContainer");
    pokemonContainer.style.display = "flex";
    const abilityElements = document.querySelectorAll(".ability");
    switch(data.types[0].type.name){
        case "fire":
            pokemonContainer.style.backgroundColor = "rgb(240, 128, 48)";
            abilityElements.forEach(el => el.style.backgroundColor = "hsla(25, 74%, 76%, 0.63)");
            break;
        case "water":
            pokemonContainer.style.backgroundColor = "#6890F0";
            abilityElements.forEach(el => el.style.backgroundColor = "hsla(222, 85%, 74%, 0.63)");
            break;
        case "grass":
            pokemonContainer.style.backgroundColor = "#78C850";
            abilityElements.forEach(el => el.style.backgroundColor = "hsla(100, 45%, 60%, 0.63)");
            break;
        case "electric":
            pokemonContainer.style.backgroundColor = "rgb(248, 208, 48)";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(247, 219, 107, 0.63)");
            break;
        case "psychic":
            pokemonContainer.style.backgroundColor = "#F85888";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(251, 144, 176, 0.63)");
            break;
        case "ice":
            pokemonContainer.style.backgroundColor = "#98D8D8";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(177, 219, 219, 0.63)");
        case "dragon":
            pokemonContainer.style.backgroundColor = "#7038F8";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(159, 127, 235, 0.63)");
            break;
        case "dark":
            pokemonContainer.style.backgroundColor = "rgb(112, 88, 72)";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(162, 142, 129, 0.63)");
            break;
        case "fairy":
            pokemonContainer.style.backgroundColor = "rgb(238, 153, 172)";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(247, 194, 205, 0.63)");
            break;
        case "normal":
            pokemonContainer.style.backgroundColor = "rgb(168, 168, 120)";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(195, 195, 180, 0.63)");
            break;
        case "fighting":
            pokemonContainer.style.backgroundColor = "#C03028";
            abilityElements.forEach(el => el.style.backgroundColor = "hsla(3, 43%, 59%, 0.63)");
            break;
        case "flying":
            pokemonContainer.style.backgroundColor = "#A890F0";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(198, 189, 224, 0.63)");
            break;
        case "poison":
            pokemonContainer.style.backgroundColor = "#A040A0";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(178, 119, 178, 0.63)");
            break;
        case "ground":
            pokemonContainer.style.backgroundColor = "#E0C068";
            abilityElements.forEach(el => el.style.backgroundColor = "hsla(44, 43%, 75%, 0.63)");
            break;
        case "rock":
            pokemonContainer.style.backgroundColor = "#B8A038";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(189, 180, 142, 0.63)");
            break;
        case "bug":
            pokemonContainer.style.backgroundColor = "#A8B820";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(195, 203, 129, 0.63)");
            break;
        case "ghost":
            pokemonContainer.style.backgroundColor = "#705898";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(159, 144, 184, 0.63)");
            break;
        case "steel":
            pokemonContainer.style.backgroundColor = "#B8B8D0";
            abilityElements.forEach(el => el.style.backgroundColor = "rgba(213, 213, 228, 0.63)");
            break;
        default:
            pokemonContainer.style.backgroundColor = "#A8A878";
    }
}