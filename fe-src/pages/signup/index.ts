import { state } from "../../state";
import { headerSetter } from "../../util";
export function initSignUp(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el class="header"></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Registrarse"></title-el>
	    <h4 class="centrado">Ingresá los siguientes datos para realizar el registro</h4>
		<input-el class="input" label="EMAIL" placeholder=""></input-el>
		<input-el class="input" label="CONTRASEÑA" type="password" placeholder=""></input-el>
		<input-el class="input" label="CONFIRMAR CONTRASEÑA" type="password" placeholder=""></input-el>
        <h5 class="centrado iniciarSesion">¿Ya tenes una cuenta? <p class="link">Iniciar Sesión</p></h5>
        <button-el class="button" color="#5A8FEC" label="Siguiente"></button-el>
    </main>
    `;
		const headerOptions = div.querySelector(".header").shadowRoot.querySelector(".header-container").querySelector(".ventana").querySelector(".ventana__cont").querySelectorAll(".ventana__contenido")
		headerSetter(headerOptions,params)
	const buttonEl = div.querySelector(".button");
	buttonEl.addEventListener("click", async () => {
		const inputEls = div.querySelectorAll(".input");
		const email = inputEls[0];
		const passFirst = inputEls[1];
		const passSecond = inputEls[2];
		/*  */
		const emailValue = email.shadowRoot.querySelector(".input").value;
		const passFirstValue = passFirst.shadowRoot.querySelector(".input").value;
		const passSecondValue = passSecond.shadowRoot.querySelector(".input").value;
		if (passFirstValue == passSecondValue) {
			await state.signUp(emailValue, passFirstValue);
			params.goTo("/home");
		} else {
			alert("Las contraseñas no coinciden");
		}
	});
	const iniciarSesionEl = div.querySelector(".iniciarSesion");
	iniciarSesionEl.addEventListener("click", () => {
		params.goTo("/login");
	});

	return div;
}
