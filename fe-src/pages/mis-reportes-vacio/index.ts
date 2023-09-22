export function initNotReports(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <div class="main">
	    <title-el label="Mascotas reportadas"></title-el>
	    <h3>Aún no reportaste mascotas perdidas</h3>
        <img-el asset="not_reports" alt="not_reports"></img-el>
        <button-el color="#5A8FEC" label="Publicar reporte"></button-el>
    </div>
    `;
	return div;
}
