export function init() {
	class Title extends HTMLElement {
		constructor() {
			super();
			this.refactor();
		}
		refactor() {
			const textoDeEntrada = this.getAttribute("label");
			const color = this.getAttribute("color");
			var style = document.createElement("style");
			style.textContent = `
            :host{
                display:block;
            }
            .title{
                font-size:36px
            }
            `;
			var shadow = this.attachShadow({ mode: "open" });
			shadow.appendChild(style);

			var div = document.createElement("div");
			div.classList.add("title");
			div.textContent = textoDeEntrada;
			div.style.color = color;
			shadow.appendChild(div);
		}
	}
	customElements.define("title-el", Title);
}
