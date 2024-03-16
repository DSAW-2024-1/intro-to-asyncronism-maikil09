const personajesMostrados = {};

const cargarCitas = async () => {
    try {
        const respuesta = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=10000`);
        if (respuesta.ok) {
            const datos = await respuesta.json();
            let personajesHTML = '';
            datos.forEach(personaje => {
                if (!personajesMostrados[personaje.character]) {
                    personajesHTML += `
                        <div class="personaje">
                            <h3 class="name">${personaje.character}</h3>
                            <img class="imagen" src="${personaje.image}" alt="${personaje.character}">
                            <p class="quote">${personaje.quote}</p>
                        </div>
                    `;
                    personajesMostrados[personaje.character] = true;
                }
            });
            document.getElementById('contenedor').innerHTML = personajesHTML;
            iniciarBusqueda();
        } else {
            console.log('Hubo un error al cargar los personajes');
        }
    } catch (error) {
        console.log('Hubo un error al cargar los personajes:', error);
    }
}

const iniciarBusqueda = () => {
    const btnBuscar = document.getElementById('btnBuscar');
    btnBuscar.addEventListener('click', () => { 
        buscarPersonajes(); 
    });
    const btnAleatorio = document.getElementById('btnAleatorio');
    btnAleatorio.addEventListener('click', () => {
        mostrarPersonajeAleatorio();
    });
}

const buscarPersonajes = () => {
    const inputBusqueda = document.getElementById('buscador');
    const textoBusqueda = inputBusqueda.value.toLowerCase();
    const personajes = document.getElementsByClassName('personaje');
    let personajeEncontrado = false;
    for (let personaje of personajes) {
        const nombrePersonaje = personaje.querySelector('.name').textContent.toLowerCase();
        const citaPersonaje = personaje.querySelector('.quote').textContent.toLowerCase();
        if (nombrePersonaje.includes(textoBusqueda) || citaPersonaje.includes(textoBusqueda)) {
            personaje.style.display = 'block'; 
            personajeEncontrado = true;
        } else {
            personaje.style.display = 'none'; 
        }
    }
    if (!personajeEncontrado) {
        alert('El personaje no está en la lista.');
        inputBusqueda.value = '';
        for (let personaje of personajes) {
            personaje.style.display = 'block';
        }
    }
}

const mostrarPersonajeAleatorio = () => {
    const personajes = document.querySelectorAll('.personaje');
    const indiceAleatorio = Math.floor(Math.random() * personajes.length);
    personajes.forEach(personaje => {
        personaje.style.display = 'none';
    });
    personajes[indiceAleatorio].style.display = 'block';
}

cargarCitas();
