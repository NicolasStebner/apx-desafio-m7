import { state } from "../../state";
import { headerSetter } from "../../util";

export function initProfileDatosPersonales(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el class="header"></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Datos Personales"></title-el>
        <input-el class="input" label="Nombre" placeholder=""></input-el>
        <input-el class="input" label="Localidad" placeholder=""></input-el>
        <button-el class="button" color="#5A8FEC" label="Guardar"></button-el>
    </main>
    `;
		const headerOptions = div.querySelector(".header").shadowRoot.querySelector(".header-container").querySelector(".ventana").querySelector(".ventana__cont").querySelectorAll(".ventana__contenido")
	headerSetter(headerOptions,params)
	/* En caso de completar los datos, guardarlos en la db */
	const button = div.querySelector(".button");
	button.addEventListener("click", async () => {
		const nombreCont = div.querySelectorAll(".input")[0];
		const nombreValue = nombreCont.shadowRoot.querySelector(".input").value;
		const localidadCont = div.querySelectorAll(".input")[1];
		const localValue = localidadCont.shadowRoot.querySelector(".input").value;
		const rta = await state.setNombreAndLocalidad(nombreValue, localValue);
		if (!rta["message"]) {
			alert("la localidad y el nombre fueron guardados");
		} else {
			alert("algo falló, intente más tarde");
		}
	});

	return div;
}
