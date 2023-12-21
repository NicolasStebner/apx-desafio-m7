import { state } from "../../state";
export async function initProfile(params) {
	const div = document.createElement("div");
	// const email = await state.getEmail();
	const email = sessionStorage.getItem("useremail");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    <title-el class="title centrado"label="Mis datos"></title-el>
        <button-el class="button datos" color="#5A8FEC" label="Modificar datos personales"></button-el>
        <button-el class="button password" color="#5A8FEC" label="Modificar contraseña"></button-el>
        <h5 class="centrado">${email}</h5>
        <p class="centrado logout link">Cerrar Sesión</p>
    </main>
    `;
	const datosButton = div.querySelector(".datos");
	const passwordButton = div.querySelector(".password");
	const logoutEl = div.querySelector(".logout");
	datosButton.addEventListener("click", () => {
		params.goTo("/profile-datos-personales");
	});
	passwordButton.addEventListener("click", () => {
		params.goTo("/profile-cambiar-contrasenia");
	});
	logoutEl.addEventListener("click", async () => {
		await state.logOut();
		params.goTo("/login");
	});
	return div;
}
