export function initReportarMascota(params) {
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
        <button-el class="button" color="#00A884" label="Reportar mascota"></button-el>
        <button-el class="button" color="#4A5553" label="Cancelar"></button-el>
    </main>
    `;

	/* TODO list:
        Aplicar cloudinary para agregar la foto
        Fijarse el tema de la ubicacion(algolia ?)

    En caso de apretar "reportar mascota", se la reporta con msj a  la BD
    En caso de cancelar, limpiar los campos y hacer un redict
     */
	return div;
}
