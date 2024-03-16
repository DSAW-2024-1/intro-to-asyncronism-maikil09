const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.style.display = 'none';
btnAnterior.style.display = 'none'; 

// Almacena los personajes mostrados
const personajesMostrados = {};

const cargarCitas = async () => {
    try {
        const respuesta = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=10000`);

        console.log(respuesta);

        if (respuesta.ok) {
            const datos = await respuesta.json();

            let personajesHTML = ''; // Almacena las citas HTML de todos los personajes

            datos.forEach(personaje => {
                // Verifica si el personaje ya ha sido mostrado antes
                if (!personajesMostrados[personaje.character]) {
                    personajesHTML += `
                        <div class="personaje">
                            <h3 class="name">${personaje.character}</h3>
                            <img class="imagen" src="${personaje.image}" alt="${personaje.character}">
                            <p class="quote">${personaje.quote}</p>
                        </div>
                    `;
                    // Marca el personaje como mostrado
                    personajesMostrados[personaje.character] = true;
                }
            });

            // Muestra todos los personajes al inicio
            document.getElementById('contenedor').innerHTML = personajesHTML;

            // Actualiza las citas gradualmente cada 5 segundos
            setInterval(actualizarCitas, 5000);

        } else {
            console.log('Hubo un error al cargar los personajes');
        }

    } catch (error) {
        console.log('Hubo un error al cargar los personajes:', error);
    }
}

// Función para cargar nuevas citas y agregarlas a los personajes mostrados
const actualizarCitas = async () => {
    try {
        const respuesta = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=10000`);

        console.log(respuesta);

        if (respuesta.ok) {
            const datos = await respuesta.json();

            datos.forEach(personaje => {
                // Verifica si el personaje ya ha sido mostrado antes
                if (!personajesMostrados[personaje.character]) {
                    const nuevoPersonajeHTML = `
                        <div class="personaje">
                            <h3 class="name">${personaje.character}</h3>
                            <img class="imagen" src="${personaje.image}" alt="${personaje.character}">
                            <div class"quote">
                            <p class=>${personaje.quote}</p>
                            </div>
                        </div>
                    `;
                    // Agrega el nuevo personaje al contenedor gradualmente
                    document.getElementById('contenedor').innerHTML += nuevoPersonajeHTML;
                    // Marca el personaje como mostrado
                    personajesMostrados[personaje.character] = true;
                }
            });

        } else {
            console.log('Hubo un error al cargar los personajes');
        }

    } catch (error) {
        console.log('Hubo un error al cargar los personajes:', error);
    }
}

// Inicia la carga de citas
cargarCitas();
