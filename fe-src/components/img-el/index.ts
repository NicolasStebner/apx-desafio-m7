const assets = {
	home_img: require("../../assets/home_img.png"),
	auth_login: require("../../assets/auth_login.png"),
	not_reports: require("../../assets/not_reports.png"),
};

export function init() {
	class Img extends HTMLElement {
		constructor() {
			super();
			this.refactor();
		}
		refactor() {
			const asset = this.getAttribute("asset");
			const textoDeEntrada = this.getAttribute("alt");
			var style = document.createElement("style");
			style.textContent = `
            :host{
                display:block;
            }
            `;
			var shadow = this.attachShadow({ mode: "open" });
			shadow.appendChild(style);

			var div = document.createElement("img");
			div.classList.add("boton");
			div.setAttribute("src", assets[asset]);
			div.setAttribute("alt", textoDeEntrada);
			shadow.appendChild(div);
		}
	}
	customElements.define("img-el", Img);
}
