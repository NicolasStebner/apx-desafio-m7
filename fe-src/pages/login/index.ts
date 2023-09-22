export function initLogin(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <div class="main">
        <img-el asset="auth_login" alt="login"></img-el>
	    <title-el label="Ingresar"></title-el>
	    <h4>Ingresá tu email para continuar</h4>
		<input-el label="EMAIL" placeholder=""></input-el>
        <button-el color="#5A8FEC" label="Siguiente"></button-el>
        <h5>¿Aún no tenes cuenta? Registrate</h5>
    </div>
    `;

	return div;
}
