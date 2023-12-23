import { state } from "../../state";
import { headerSetter } from "../../util";
export async function initLogin(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el class="header"></header-el>
    <main class="main">
        <img-el class="img" asset="auth_login" alt="login"></img-el>
	    <title-el class="title centrado" label="Ingresar"></title-el>
	    <h4 class="centrado" >Ingresá tu email para continuar</h4>
		<input-el class="input" label="EMAIL" type="email" placeholder=""></input-el>
        <button-el class="button" color="#5A8FEC" label="Siguiente"></button-el>
		<h5 class="centrado signup">¿Aún no tenes cuenta? <p class="link">Registrate</p></h5>
    </main>
    `;
	const headerOptions = div.querySelector(".header").shadowRoot.querySelector(".header-container").querySelector(".ventana").querySelector(".ventana__cont").querySelectorAll(".ventana__contenido")
	headerSetter(headerOptions,params)
	const buttonEl = div.querySelector(".button");
	buttonEl.addEventListener("click", async () => {
		const emailCont = div.querySelector(".input");
		const input = emailCont.shadowRoot.querySelector(".input");
		const existeMail = await state.chequeoExistenciaEmail(input.value);
		//console.log("rta desde pagina button ", existeMail);

		if (existeMail === null) {
			params.goTo("/signup");
		} else {
			params.goTo("/login-password");
		}
	});
	const signUpEl = div.querySelector(".signup");
	signUpEl.addEventListener("click", () => {
		params.goTo("/signup");
	});
	return div;
}
