import { state } from "../../state";
import { headerSetter } from "../../util";
export async function initMisReportes(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	const misReportes = await state.misReportes(); //reportes hechos por el usuario
	if(misReportes.length != 0){
		div.innerHTML = `
		<header-el class="header"></header-el>
    <main class="main">
			<title-el class="title centrado" label="Mascotas reportadas"></title-el>
			${showReports(misReportes,params)}
    </main>
		`;
		const buttons = div.querySelectorAll(".button-editar") //elijo todos los buttons de showReports()
		var contador = 0
		//mappeo de los reportes para agregar en cada boton al redireccion correspondiente
		misReportes.map((r)=>{
			buttons[contador].addEventListener("click",()=>{
				sessionStorage.setItem("mascota_id",r.id)
				state.getMascotaById()
				params.goTo("/edit-mascota")
			})
			contador++;
		})
	}else{
		div.innerHTML = `
			<header-el class="header"></header-el>
    	<main class="main">
				<title-el class="title centrado" label="Mascotas reportadas"></title-el>
				<h3 class="centrado" >Aún no reportaste mascotas perdidas</h3>
				<img-el class="img" asset="not_reports" alt="not_reports"></img-el>
				<button-el class="button publicar-reporte" color="#5A8FEC" label="Publicar reporte"></button-el>
    	</main>
		`;
		const button = div.querySelector(".publicar-reporte")
		button.addEventListener("click", ()=>{
			params.goTo("/reportar-mascota");
		})
	}
	const headerOptions = div.querySelector(".header").shadowRoot.querySelector(".header-container").querySelector(".ventana").querySelector(".ventana__cont").querySelectorAll(".ventana__contenido")
	headerSetter(headerOptions,params)
	return div;
}

function showReports(reportes,params){
	let listHTML = `<div class="card-distribution">`
	for (const r in reportes) {
		listHTML += `<div class="container">
									<img class="imagen" src=${reportes[r].fotoURL}>
									<div class="info-container">
										<div class="nombre-lugar">
											<div class="nombre">${reportes[r].nombre}</div>
											<div>${reportes[r].ubicacion}</div>
										</div>
										<button-el class="button-editar" color="#5A8FEC" label="editar"></button-el>
									</div>
								</div>`;
	}
	listHTML += `</div>`
	return listHTML
}
