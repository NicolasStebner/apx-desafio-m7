export function initLogin(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
        <img-el class="img" asset="auth_login" alt="login"></img-el>
	    <title-el class="title centrado" label="Ingresar"></title-el>
	    <h4>Ingresá tu email para continuar</h4>
		<input-el label="EMAIL" placeholder=""></input-el>
        <button-el class="button" color="#5A8FEC" label="Siguiente"></button-el>
        <h5>¿Aún no tenes cuenta? Registrate</h5>
    </main>
    `;

	return div;
}
