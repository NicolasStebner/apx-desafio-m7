import { state } from "../../state";
export async function initMascotasCercanas(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	const mascotasCerca = await state.mascotasCerca();
	if(mascotasCerca.length > 0){
		div.innerHTML = `
		<header-el></header-el>
		<div class="contenedor-report">
			<div class="right">
				<p class="x">X</p>
			</div>
			<title-el class="centrado" label="Reportar info"></title-el>
			<div>
				<input-el class="input" label="Nombre" placeholder=""></input-el>
				<input-el class="input" label="Teléfono (011 1111-1111)" placeholder=""></input-el>
				<input-el class="input" label="¿Dónde lo viste?" placeholder=""></input-el>
				<button-el class="button enviar-info" color="#00A884" label="Enviar Información"></button-el>
			</div>
		</div>
    <div class="main">
			<title-el class="centrado" label="Mascotas perdidas cerca"></title-el>
			${showResults(mascotasCerca)}
    </div>
    `;
		const buttons = div.querySelectorAll(".button-editar") //elijo todos los buttons de showReports()
		const reportEl = div.querySelector(".contenedor-report")
		const enviarInfoEl = div.querySelector(".enviar-info")
		const equisEl = div.querySelector(".x")
		
		equisEl.addEventListener("click",()=>{
			const nombreCont = div.querySelectorAll(".input")[0];
			nombreCont.shadowRoot.querySelector(".input").value = "";
			const telefonoCont = div.querySelectorAll(".input")[1];
			telefonoCont.shadowRoot.querySelector(".input").value = "";
			const infoCont = div.querySelectorAll(".input")[2];
			infoCont.shadowRoot.querySelector(".input").value = "";
			reportEl.style.display = ""
		})
		
		enviarInfoEl.addEventListener("click",()=>{
			//
			const nombreCont = div.querySelectorAll(".input")[0];
			const nombreValue = nombreCont.shadowRoot.querySelector(".input").value;
			const telefonoCont = div.querySelectorAll(".input")[1];
			const telefonoValue = telefonoCont.shadowRoot.querySelector(".input").value;
			const infoCont = div.querySelectorAll(".input")[2];
			const infoValue = infoCont.shadowRoot.querySelector(".input").value;
			//
			state.sendEmail(nombreValue,telefonoValue,infoValue)
			//
			nombreCont.shadowRoot.querySelector(".input").value = ""
			telefonoCont.shadowRoot.querySelector(".input").value = ""
			infoCont.shadowRoot.querySelector(".input").value = ""
			reportEl.style.display = ""
		})

		var contador = 0
		//mappeo de los reportes para agregar en cada boton al redireccion correspondiente
		mascotasCerca.map((r)=>{
			buttons[contador].addEventListener("click",()=>{
				sessionStorage.setItem("mascota_id",r.id)
				reportEl.style.display = "flex"
			})
			contador++;
		})
	}else{
		div.innerHTML = `
		<header-el></header-el>
    <div class="main">
			<title-el class="centrado" label="No hay mascotas cerca"></title-el>
    </div>`;
	}
	return div;
}

function showResults(mascotas){
	let listHTML = `<div class="card-distribution">`
	for (const r in mascotas) {
		listHTML += `<div class="container">
									<img class="imagen" src=${mascotas[r].fotoURL}>
									<div class="info-container">
										<div class="nombre-lugar">
											<div class="nombre">${mascotas[r].nombre}</div>
											<div>${mascotas[r].ubicacion}</div>
										</div>
										<button-el class="button-editar" color="#EB6372" label="Reportar"></button-el>
									</div>
								</div>`;
	}
	listHTML += `</div>`
	return listHTML
}
