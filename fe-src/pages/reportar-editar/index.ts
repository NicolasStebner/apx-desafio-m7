export function initEditarReporteMascota(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
    <main class="main">
	    <title-el class="title centrado" label="Reportar mascota"></title-el>
        <h4 class="centrado">Ingresá la siguiente información para realizar el reporte de la mascota</h4>
        <input-el label="Nombre" placeholder=""></input-el>
        <img-el class="img" asset="reporte_mascota" alt="imagen_para_subir" ></img-el>
        <button-el class="button" color="#5A8FEC" label="Agregar foto"></button-el>
        <img-el class="img" asset="mapa" alt="mapa_referencia" ></img-el>
        <h3>Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</h3>
        <input-el label="Ubicacion" placeholder=""></input-el>
        <button-el class="button" color="#5A8FEC" label="Guardar"></button-el>
        <button-el class="button" color="#00A884" label="Reportar como encontrado"></button-el>
        <button-el class="button" color="#EB6372" label="Eliminar reporte"></button-el>
    </main>
    `;
	return div;
}
