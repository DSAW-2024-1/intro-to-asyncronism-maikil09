let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		"cargarPeliculas();"
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		"cargarPeliculas();"
	}
});

const cargarPersonajes =async ()=>{
    try{
    const respuesta = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=10');
    
    console.log(respuesta);
    if(respuesta.status === 200){
        const datos = await respuesta.json();

        let personajes = '';
        datos.forEach(personaje => {
           
        });
        document.getElementById('contenedor').innerHTML = personajes;
    }else if(respuesta.status === 401){
        console.log("Error obteniendo un personaje");
    }

    
    } catch(error){
        console.log(error);
    }
}
cargarPersonajes();