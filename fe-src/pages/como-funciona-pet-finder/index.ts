export async function initComoFuncionaPage(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
	<main class="main">
    <div class = "container-informacion">
      <div>
  		  <title-el class="title centrado" color="#EB6372" label="¿Cómo funciona Pet Finder?"></title-el>
		    <p class="justificado">Con nuestra aplicación de Pet Finder, encontrar a 
          tu mascota perdida es más fácil que nunca. Solo necesitas registrarte, completar tu perfil y,
          en caso de pérdida, crear un informe detallado con la foto y descripción de tu compañero peludo. 
          Explora la sección de mascotas perdidas, donde aparecerán las mascotas cercanas según tu ubicación. 
          Cuando se logra un reencuentro, marca el caso como resuelto y comparte la alegría con la comunidad. 
          ¡Hacé que la búsqueda y reunión de mascotas perdidas sea una experiencia colaborativa y 
          emotiva con nuestra aplicación!</p>
      </div>
      <button-el class="button volver" color="#4A5553" label="Volver"></button-el>
    </div>
	</main>
    `;
	const buttonUbicacionEl = div.querySelector(".volver");
	buttonUbicacionEl.addEventListener("click", () => {
		params.goTo("/home")
	});
	return div;
}
