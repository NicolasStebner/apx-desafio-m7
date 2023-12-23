import { state } from "../../state";
import { headerSetter } from "../../util";
export function initEditarReporteMascota(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
    var mascota = JSON.parse(sessionStorage.getItem("mascota"))
	div.innerHTML = `
	<header-el class="header"></header-el>
    <main class="main">
        <title-el class="title centrado" label="Editar reporte de mascota"></title-el>
        <h4 class="centrado">Ingresá la siguiente información para realizar el reporte de la mascota</h4>
        <input-el class="input" label="Nombre" placeholder="" defaultValue="${mascota.nombre}"></input-el>
        <img class="img img-to-replace" src="${mascota.fotoURL}" alt="agrega una imagen de tu mascota"></img>
        <button-el class="button upPhoto" color="#5A8FEC" label="Agregar foto"></button-el>
        <h3>Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</h3>
        <div id="map" class="map"></div>
        <form class="search-form">
            <input class="ubication-input"name="q" type="search" value="${mascota.ubicacion}"/>
            <button class="buscar">Buscar</button>
        </form>
        <button-el class="button guardar" color="#5A8FEC" label="Guardar"></button-el>
        <button-el class="button encontrado" color="#00A884" label="Reportar como encontrado"></button-el>
        <button-el class="button eliminar" color="#EB6372" label="Eliminar reporte"></button-el>
    </main>
    `;
    const headerOptions = div.querySelector(".header").shadowRoot.querySelector(".header-container").querySelector(".ventana").querySelector(".ventana__cont").querySelectorAll(".ventana__contenido")
	headerSetter(headerOptions,params)
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
    const buttonGuardar = div.querySelector(".guardar")
    buttonGuardar.addEventListener("click",()=>{
        const nombreCont = div.querySelector(".input");
		const nombreValue = nombreCont.shadowRoot.querySelector(".input").value;
		const urlImagen = div.querySelector(".img-to-replace").getAttribute("src");
		const ubicacion = div.querySelector(".ubication-input").value;
        state.updateMascota(nombreValue,urlImagen,ubicacion);
        params.goTo("/mis-reportes")
    })
    const buttonEncontrado = div.querySelector(".encontrado")
    buttonEncontrado.addEventListener("click",()=>{
        state.mascotaEncontrada();
        params.goTo("/mis-reportes")
    })
    const buttonEliminar = div.querySelector(".eliminar")
    buttonEliminar.addEventListener("click",()=>{
        state.eliminarMascota();
        params.goTo("/mis-reportes")
    })
	return div;
}