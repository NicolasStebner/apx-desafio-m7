export function initSignUp(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <div class="main">
	    <title-el label="Registrarse"></title-el>
	    <h4>Ingresá los siguientes datos para realizar el registro</h4>
		<input-el label="EMAIL" placeholder=""></input-el>
		<input-el label="CONTRASEÑA" placeholder=""></input-el>
		<input-el label="CONFIRMAR CONTRASEÑA" placeholder=""></input-el>
        <h5>¿Ya tenes una cuenta? Iniciar Sesión</h5>
        <button-el color="#5A8FEC" label="Siguiente"></button-el>
    </div>
    `;

	return div;
}
