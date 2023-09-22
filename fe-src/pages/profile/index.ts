export function initProfile(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <div class="main">
	    <title-el label="Mis datos"></title-el>
        <button-el class="button datos" color="#5A8FEC" label="Modificar datos personales"></button-el>
        <button-el class="button password" color="#5A8FEC" label="Modificar contraseña"></button-el>
        <h5>EMAIL_USER@HOTMAIL.COM</h5>
        <p>Cerrar Sesión</p>
    </div>
    `;
	const datosButton = div.querySelector(".datos");

	datosButton.addEventListener("click", () => {
		params.goTo("/profile-datos-personales");
	});
	const passwordButton = div.querySelector(".password");
	passwordButton.addEventListener("click", () => {
		console.log("click para password");
		params.goTo("/profile-cambiar-contrasenia");
	});

	return div;
}
