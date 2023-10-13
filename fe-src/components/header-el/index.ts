const assets = {
	logo_header: require("../../assets/logo_header.png"),
};

import { state } from "../../state";

export function init() {
	class Header extends HTMLElement {
		constructor() {
			super();
			this.refactor();
		}
		refactor() {
			var emailUser = sessionStorage.getItem("useremail");
			var style = document.createElement("style");
			style.textContent = `
            :host{
                display:block;
				box-sizing: border-box;
            }
			.ventana {
				position: absolute;
				background-color: #26302E;
				right: 0;
				top: 0;
				left: 0;
				bottom: 10vh;
				display: none;
			}
			.ventana__contenido:visited {
				color: white;
			}
			.ventana__contenido {
				color: white;
			}
			.ventana__cierra-ventana {
				position: absolute;
				margin: 0;
				top: 5px;
				right: 20px;
				font-size: 36px;
			}
			.ventana__cont {
				margin: 150px auto;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.ventana__contenido {
				text-decoration: none;
				text-align: center;
				font-size: 24px;
				margin-bottom: 40px;
			}
            .header-container{
				display:flex;
				justify-content: space-between;
                background-color:#26302E;
                height:50px;
                color:white;
				padding: 5px 15px;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
            }
			.header__PSC-mobile {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				border-radius: 2px;
				width: 20px;
				height:20px;
				padding: 5px;
				margin:auto 0
			}
			.img{
				width:40px;
				height:40px;
				margin: auto 0;
			}
			.barra {
				background-color: white;
				height: 3px;
			}
			.link{
				color:#3B97D3;
			}
			.link:visited{
				color:#3B97D3;
			}
            `;
			var shadow = this.attachShadow({ mode: "open" });
			shadow.appendChild(style);
			/* Creo la ventana con las opciones*/
			var ventana = document.createElement("div");
			ventana.classList.add("ventana");

			var cerrarVentanaEquis = document.createElement("p");
			cerrarVentanaEquis.textContent = "X";
			cerrarVentanaEquis.classList.add("ventana__cierra-ventana");
			cerrarVentanaEquis.addEventListener("click", () => {
				ventana.style.display = "";
			});
			var ventanaContenedor = document.createElement("div");
			ventanaContenedor.classList.add("ventana__cont");

			var homeLink = document.createElement("a");
			homeLink.classList.add("ventana__contenido");
			homeLink.textContent = "Home";
			homeLink.setAttribute("href", "./home");

			var misDatosLink = document.createElement("a");
			misDatosLink.classList.add("ventana__contenido");
			misDatosLink.textContent = "Mis datos";
			misDatosLink.setAttribute("href", "./profile");

			var misMascotasReportadas = document.createElement("a");
			misMascotasReportadas.classList.add("ventana__contenido");
			misMascotasReportadas.textContent = "Mis mascotas reportadas";
			misMascotasReportadas.setAttribute("href", "./mis-reportes");

			var reportarMascota = document.createElement("a");
			reportarMascota.classList.add("ventana__contenido");
			reportarMascota.textContent = "Reportar mascota";
			reportarMascota.setAttribute("href", "./reportar-mascota");

			var emailUserCont = document.createElement("p");
			emailUserCont.textContent = emailUser;
			emailUserCont.classList.add("ventana__contenido");

			var cerrarSesion = document.createElement("a");
			cerrarSesion.textContent = "Cerrar Sesión";
			cerrarSesion.setAttribute("href", "/login");
			cerrarSesion.classList.add("ventana__contenido");
			cerrarSesion.classList.add("link");
			cerrarSesion.addEventListener("click", async () => {
				await state.logOut();
			});

			ventanaContenedor.appendChild(homeLink);
			ventanaContenedor.appendChild(misDatosLink);
			ventanaContenedor.appendChild(misMascotasReportadas);
			ventanaContenedor.appendChild(reportarMascota);
			ventanaContenedor.appendChild(emailUserCont);
			ventanaContenedor.appendChild(cerrarSesion);

			ventana.appendChild(cerrarVentanaEquis);
			ventana.appendChild(ventanaContenedor);
			/* Creo el header container */
			var div = document.createElement("div");
			div.classList.add("header-container");

			var divLogo = document.createElement("img");
			divLogo.setAttribute("src", assets["logo_header"]);
			divLogo.classList.add("img");

			var divContenedorOpciones = document.createElement("div");
			/* Creo el menu compactado */
			divContenedorOpciones.classList.add("header__PSC-mobile");
			var barraOpcion = document.createElement("div");
			var barraOpcionDos = document.createElement("div");
			var barraOpcionTres = document.createElement("div");
			barraOpcion.classList.add("barra");
			barraOpcionDos.classList.add("barra");
			barraOpcionTres.classList.add("barra");

			divContenedorOpciones.appendChild(barraOpcion);
			divContenedorOpciones.appendChild(barraOpcionDos);
			divContenedorOpciones.appendChild(barraOpcionTres);

			divContenedorOpciones.addEventListener("click", () => {
				ventana.style.display = "inherit";
			});

			/* Agrego todo */
			div.appendChild(ventana);
			div.appendChild(divLogo);
			div.appendChild(divContenedorOpciones);
			shadow.appendChild(div);
		}
	}
	customElements.define("header-el", Header);
}
