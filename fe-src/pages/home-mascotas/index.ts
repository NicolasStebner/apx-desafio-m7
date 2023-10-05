import { state } from "../../state";
export function initHomeMascotas(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <div class="main">
	    <subtitle-el label="Mascotas perdidas cerca"></subtitle-el>
    </div>
    `;
	const mascotasCerca = state.mascotasCerca();
	/* con el resultado de mascotasCerca mostrar en pantalla el resultado */
	return div;
}
