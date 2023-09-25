export function initSignUp(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Registrarse"></title-el>
	    <h4>Ingresá los siguientes datos para realizar el registro</h4>
		<input-el label="EMAIL" placeholder=""></input-el>
		<input-el label="CONTRASEÑA" placeholder=""></input-el>
		<input-el label="CONFIRMAR CONTRASEÑA" placeholder=""></input-el>
        <h5>¿Ya tenes una cuenta? Iniciar Sesión</h5>
        <button-el class="button" color="#5A8FEC" label="Siguiente"></button-el>
    </main>
    `;

	return div;
}
