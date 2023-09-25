export function initProfileCambiarContrasenia(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Contraseña"></title-el>
        <input-el label="CONTRASEÑA" placeholder=""></input-el>
        <input-el label="CONFIRMAR CONTRASEÑA" placeholder=""></input-el>
        <button-el class="button" color="#5A8FEC" label="Guardar"></button-el>
    </main>
    `;

	return div;
}
