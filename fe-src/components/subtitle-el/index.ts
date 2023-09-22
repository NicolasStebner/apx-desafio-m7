export function init() {
	class Subtitle extends HTMLElement {
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
            .subtitle{
                font-size:24px
            }
            `;
			var shadow = this.attachShadow({ mode: "open" });
			shadow.appendChild(style);

			var div = document.createElement("div");
			div.classList.add("subtitle");
			div.textContent = textoDeEntrada;
			div.style.color = color;
			shadow.appendChild(div);
		}
	}
	customElements.define("subtitle-el", Subtitle);
}
