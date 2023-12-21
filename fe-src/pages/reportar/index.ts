import { state } from "../../state";
export function initReportarMascota(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    	<title-el class="title centrado" label="Reportar mascota"></title-el>
        <h4 class="centrado">Ingresá la siguiente información para realizar el reporte de la mascota</h4>
        <input-el class="input" label="Nombre" placeholder=""></input-el>
        <img class="img img-to-replace" src="../../assets/reporte_mascota.png" alt="agrega una imagen de tu mascota"></img>
        <button-el class="button upPhoto" color="#5A8FEC" label="Agregar foto"></button-el>
        <h3>Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</h3>
        <div id="map" class="map"></div>
        <form class="search-form">
            <input class="ubication-input"name="q" type="search" />
            <button>Buscar</button>
        </form>
        <button-el class="button reportar" color="#00A884" label="Reportar mascota"></button-el>
        <button-el class="button cancelar" color="#4A5553" label="Cancelar"></button-el>
    </main>
    `;
	const buttonToAddPhoto = div.querySelector(".upPhoto");
	buttonToAddPhoto.addEventListener("click", () => {
		const imgEl = div.querySelector(".img-to-replace");
		const localStorageURL = localStorage.getItem("urlMascota");
		if (localStorageURL) {
			imgEl.setAttribute("src", localStorageURL);
		} else {
			alert("algo salio mal");
		}
	});
	const buttonReportar = div.querySelector(".reportar");
	buttonReportar.addEventListener("click", async () => {
		const nombreCont = div.querySelector(".input");
		const nombreValue = nombreCont.shadowRoot.querySelector(".input").value;
		const urlImagen = div.querySelector(".img-to-replace").getAttribute("src");
		const ubicacion = div.querySelector(".ubication-input").value;
		await state.publicarReporteMascota(nombreValue, urlImagen, ubicacion);
		params.goTo("/home")
	});

	const buttonCancelar = div.querySelector(".cancelar");
	buttonCancelar.addEventListener("click", () => {
		const nombreCont = div.querySelector(".input");
		nombreCont.shadowRoot.querySelector(".input").value = "";
		div.querySelector(".ubication-input").value = "";
		params.goTo("/home")
	});

	return div;
}
