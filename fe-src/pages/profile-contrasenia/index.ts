import { state } from "../../state";
import { headerSetter } from "../../util";

export function initProfileCambiarContrasenia(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el class="header"></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Contraseña"></title-el>
        <input-el class="input" label="CONTRASEÑA" type="password" placeholder=""></input-el>
        <input-el class="input" label="CONFIRMAR CONTRASEÑA" type="password" placeholder=""></input-el>
        <button-el class="button" color="#5A8FEC" label="Guardar"></button-el>
    </main>
    `;
		const headerOptions = div.querySelector(".header").shadowRoot.querySelector(".header-container").querySelector(".ventana").querySelector(".ventana__cont").querySelectorAll(".ventana__contenido")
	headerSetter(headerOptions,params)
	const buttonEl = div.querySelector(".button");
	buttonEl.addEventListener("click", async () => {
		const [firstInput, secondIn] = div.querySelectorAll(".input");
		const firstInputValue = firstInput.shadowRoot.querySelector(".input").value;
		const secondInputValue = secondIn.shadowRoot.querySelector(".input").value;
		if (firstInputValue == secondInputValue) {
			const rta = await state.cambiarContrasenia(firstInputValue);
		} else {
			alert("las contraseñas deben coincidir");
		}
	});
	return div;
}
