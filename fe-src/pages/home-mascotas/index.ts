export function initHomeMascotas(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <div class="main">
	    <subtitle-el label="Mascotas perdidas cerca"></subtitle-el>
    </div>
    `;

	return div;
}
