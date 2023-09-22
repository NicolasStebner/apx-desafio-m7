export function initProfileCambiarContrasenia(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <div class="main">
	    <title-el label="Contraseña"></title-el>
        <input-el label="CONTRASEÑA" placeholder=""></input-el>
        <input-el label="CONFIRMAR CONTRASEÑA" placeholder=""></input-el>
        <button-el color="#5A8FEC" label="Guardar"></button-el>
    </div>
    `;

	return div;
}
