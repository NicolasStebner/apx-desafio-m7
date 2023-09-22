export function initPageWelcome(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
	<div class="main">
		<img-el class="img" asset="home_img" alt="permissions"></img-el>
		<title-el color="#EB6372" label="Pet Finder App"></title-el>
		<subtitle-el label="Encontrá y reportá mascotas perdidas cerca de tu ubicación"></subtitle-el>
		<button-el class="button ubicacion" color="#5A8FEC" label="Dar mi ubicacion actual"></button-el>
		<button-el class="button" color="#00A884"label="¿Cómo funciona Pet Finder?"></button-el>
	</div>
    `;
	const buttonUbicacionEl = div.querySelector(".ubicacion");
	buttonUbicacionEl.addEventListener("click", () => {
		params.goTo("/home-mascotas");
	});
	return div;
}
