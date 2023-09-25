export function initMisReportes(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Mascotas reportadas"></title-el>
    </main>
    `;
	return div;
}
