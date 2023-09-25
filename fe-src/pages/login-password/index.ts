export function initLoginPassword(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    <title-el class="title centrado"label="Iniciar Sesión"></title-el>
	    <h4>Ingresá los siguientes datos para iniciar sesión</h4>
		<input-el label="EMAIL" placeholder=""></input-el>
		<input-el label="CONTRASEÑA" placeholder=""></input-el>
        <h5>Olvidé mi contraseña</h5>
        <button-el class="button"color="#5A8FEC" label="Acceder"></button-el>
    </main>
    `;

	return div;
}
