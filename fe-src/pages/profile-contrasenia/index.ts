import { state } from "../../state";

export function initProfileCambiarContrasenia(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Contraseña"></title-el>
        <input-el class="input" label="CONTRASEÑA" type="password" placeholder=""></input-el>
        <input-el class="input" label="CONFIRMAR CONTRASEÑA" type="password" placeholder=""></input-el>
        <button-el class="button" color="#5A8FEC" label="Guardar"></button-el>
    </main>
    `;
	const buttonEl = div.querySelector(".button");
	buttonEl.addEventListener("click", async () => {
		const [firstInput, secondIn] = div.querySelectorAll(".input");
		const firstInputValue = firstInput.shadowRoot.querySelector(".input").value;
		const secondInputValue = secondIn.shadowRoot.querySelector(".input").value;
		if (firstInputValue == secondInputValue) {
			const rta = await state.cambiarContrasenia(firstInputValue);
			if (rta["message"] == "password updated") {
				alert("contraseña cambiada");
			} else if (rta["message"] == "user not found") {
				alert("el usuario no fue encontrado, debe registrarse");
				params.goTo("/signup");
			} else {
				alert("no iniciaste sesion");
				params.goTo("/login");
			}
		} else {
			alert("las contraseñas deben coincidir");
		}
	});
	return div;
}
