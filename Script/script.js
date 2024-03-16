// Objeto para almacenar los personajes ya mostrados
const personajesMostrados = {};

// Función para cargar las citas de los personajes
const cargarCitas = async () => {
    try {
        // Hacer una solicitud a la API para obtener las citas
        const respuesta = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=10000`);

        // Verificar si la solicitud fue exitosa
        if (respuesta.ok) {
            // Obtener los datos de la respuesta en formato JSON
            const datos = await respuesta.json();

            // Variable para almacenar el HTML de los personajes
            let personajesHTML = '';

            // Iterar sobre los datos recibidos
            datos.forEach(personaje => {
                // Verificar si el personaje ya ha sido mostrado
                if (!personajesMostrados[personaje.character]) {
                    // Construir el HTML para mostrar el personaje y su cita
                    personajesHTML += `
                        <div class="personaje" onclick="traerFrase('${personaje.character}')">
                            <h3 class="name">${personaje.character}</h3>
                            <img class="imagen" src="${personaje.image}" alt="${personaje.character}">
                            <p class="quote">${personaje.quote}</p>
                        </div>
                    `;
                    // Marcar el personaje como mostrado
                    personajesMostrados[personaje.character] = true;
                }
            });

            // Insertar el HTML generado en el contenedor correspondiente
            document.getElementById('contenedor').innerHTML = personajesHTML;

            // Iniciar la búsqueda después de cargar las citas
            iniciarBusqueda();

        } else {
            console.log('Hubo un error al cargar los personajes');
        }

    } catch (error) {
        console.log('Hubo un error al cargar los personajes:', error);
    }
}

// Función para traer una frase distinta del mismo personaje
const traerFrase = async (personaje) => {
    try {
        // Hacer una solicitud a la API para obtener una cita del personaje
        const respuesta = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=10&character=${encodeURIComponent(personaje)}`);

        // Verificar si la solicitud fue exitosa
        if (respuesta.ok) {
            // Obtener los datos de la respuesta en formato JSON
            const datos = await respuesta.json();

            // Actualizar la cita del personaje en la página
            const personajeElemento = document.querySelector(`.personaje h3.name:contains('${personaje}')`).parentNode;
            personajeElemento.querySelector('.quote').textContent = datos[0].quote;

        } else {
            console.log('Hubo un error al cargar la cita del personaje', personaje);
        }

    } catch (error) {
        console.log('Hubo un error al cargar la cita del personaje', personaje, ':', error);
    }
}

// Función para iniciar la búsqueda cuando se hace clic en el botón
const iniciarBusqueda = () => {
    const btnBuscar = document.getElementById('btnBuscar');
    btnBuscar.addEventListener('click', () => { 
        buscarPersonajes(); 
    });

    // Agregar evento al botón de personaje aleatorio
    const btnAleatorio = document.getElementById('btnAleatorio');
    btnAleatorio.addEventListener('click', () => {
        mostrarPersonajeAleatorio();
    });
}

// Función para buscar personajes y actualizar las citas de todos los personajes
const buscarPersonajes = () => {
    // Obtener el texto de búsqueda del input
    const inputBusqueda = document.getElementById('buscador');
    const textoBusqueda = inputBusqueda.value.toLowerCase();

    // Obtener todos los elementos de personaje
    const personajes = document.getElementsByClassName('personaje');
    
    // Variable para indicar si se encontró al menos un personaje
    let personajeEncontrado = false;

    // Iterar sobre los personajes y ocultar/mostrar según la búsqueda
    for (let personaje of personajes) {
        const nombrePersonaje = personaje.querySelector('.name').textContent.toLowerCase();
        const citaPersonaje = personaje.querySelector('.quote').textContent.toLowerCase();
        if (nombrePersonaje.includes(textoBusqueda) || citaPersonaje.includes(textoBusqueda)) {
            personaje.style.display = 'block'; // Mostrar el personaje si coincide con la búsqueda
            personajeEncontrado = true;
        } else {
            personaje.style.display = 'none'; // Ocultar el personaje si no coincide con la búsqueda
        }
    }

    // Mostrar un mensaje si no se encontraron personajes
    if (!personajeEncontrado) {
        alert('El personaje no está en la lista.');
        inputBusqueda.value = ''; // Limpiar el campo de búsqueda
        // Mostrar todos los personajes nuevamente
        for (let personaje of personajes) {
            personaje.style.display = 'block';
        }
    }
}

// Función para mostrar un personaje aleatorio
const mostrarPersonajeAleatorio = () => {
    // Obtener todos los elementos de personaje
    const personajes = document.querySelectorAll('.personaje');
    // Obtener un índice aleatorio dentro del rango de personajes
    const indiceAleatorio = Math.floor(Math.random() * personajes.length);
    // Ocultar todos los personajes
    personajes.forEach(personaje => {
        personaje.style.display = 'none';
    });
    // Mostrar el personaje aleatorio seleccionado
    personajes[indiceAleatorio].style.display = 'block';
}

// Cargar las citas de los personajes al inicio
cargarCitas();
