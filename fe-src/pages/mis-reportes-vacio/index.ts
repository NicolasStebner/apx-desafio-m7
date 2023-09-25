export function initNotReports(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Mascotas reportadas"></title-el>
	    <h3 class="centrado" >Aún no reportaste mascotas perdidas</h3>
        <img-el class="img" asset="not_reports" alt="not_reports"></img-el>
        <button-el class="button" color="#5A8FEC" label="Publicar reporte"></button-el>
    </main>
    `;
	return div;
}
