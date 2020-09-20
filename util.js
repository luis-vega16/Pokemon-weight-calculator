
const tabla = document.getElementById("table_body");
const pesototal = document.getElementById("total_weight");
const errorM = document.getElementById("error_message");
const Botonbuscar = document.getElementById("search_pokemon");
const campo = document.getElementById("pokemon_name");


const buscar = async id => {
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    url += id;
    const result = await fetch(url).then(result => result.json()).then(data => data);
    return result;
}

const agregar = pokemon => {
    const tr = document.createElement('tr');
    const tableImage = document.createElement('td');
    const image = document.createElement('img');
    const name = document.createElement('td');
    const weight = document.createElement('td');
    const tableButton = document.createElement('td');
    const button = document.createElement('button');

    button.addEventListener('click', (e) => {
        e.target.closest('tr').remove();
        pesototal.innerText = getTotalWeight();
    });

    button.innerText = 'X';
    tableButton.appendChild(button);

    image.setAttribute('src', pokemon.sprites.front_default);

    name.innerText = pokemon.name;
    weight.innerText = pokemon.weight;
    tableImage.style.maxWidth = '64px';
    tableImage.appendChild(image);

    weight.classList.add('pokemon_weight')

    tr.appendChild(tableImage);
    tr.appendChild(name);
    tr.appendChild(weight);
    tr.appendChild(tableButton);

    tabla.appendChild(tr);
    pesototal.innerText = getTotalWeight();
    errorM .style.color = 'white';
}

Botonbuscar.addEventListener('click', () => {
    if(campo.value){
        buscar(campo.value)
        .then(data => agregar(data))
        .catch(err => nada());
    }else{
        nada();
    }

    campo.value = '';
})

const getTotalWeight = _ => {
    const nodes = Array.from(document.querySelectorAll('.pokemon_weight'));
    const values = nodes.map(w => w.innerText);
    var total = 0;

    if(values.length > 0){
        total = values.reduce((t,v) => Number(t) + Number(v));
    }

    return parseFloat(total);

}

const nada  = _ => {
    errorM .style.color = 'red';
}

