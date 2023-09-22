export function initProfileDatosPersonales(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <div class="main">
	    <title-el label="Datos Personales"></title-el>
        <input-el label="Nombre" placeholder=""></input-el>
        <input-el label="Localidad" placeholder=""></input-el>
        <button-el color="#5A8FEC" label="Guardar"></button-el>
    </div>
    `;

	return div;
}
