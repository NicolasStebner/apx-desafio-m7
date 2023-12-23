import { state } from "../../state";
import { headerSetter } from "../../util";
export function initLoginPassword(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el class="header"></header-el>
    <main class="main">
	    <title-el class="title centrado"label="Iniciar Sesión"></title-el>
	    <h4 class="centrado">Ingresá los siguientes datos para iniciar sesión</h4>
		<input-el class="input" label="EMAIL" placeholder=""></input-el>
		<input-el class="input" label="CONTRASEÑA" type="password" placeholder=""></input-el>
        <h5 class="centrado link forgot"><p>Olvidé mi contraseña</p></h5>
        <button-el class="button"color="#5A8FEC" label="Acceder"></button-el>
    </main>
    `;
	const headerOptions = div.querySelector(".header").shadowRoot.querySelector(".header-container").querySelector(".ventana").querySelector(".ventana__cont").querySelectorAll(".ventana__contenido")
	headerSetter(headerOptions,params)
	const buttonEl = div.querySelector(".button");
	buttonEl.addEventListener("click", async () => {
		const emailCont = div.querySelectorAll(".input")[0];
		const emailValue = emailCont.shadowRoot.querySelector(".input").value;
		const passwordCont = div.querySelectorAll(".input")[1];
		const passValue = passwordCont.shadowRoot.querySelector(".input").value;
		const rta = await state.signIn(emailValue, passValue);
		if (rta) {
			params.goTo("/profile");
		} else {
			alert("el usuario o la contraseña son incorrectos");
		}
	});
	const forgotPasswordEl = div.querySelector(".forgot");
	forgotPasswordEl.addEventListener("click", () => {
		params.goTo("/signup");
	});
	return div;
}
