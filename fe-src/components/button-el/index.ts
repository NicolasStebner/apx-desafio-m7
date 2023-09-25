export function init() {
	class Button extends HTMLElement {
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
            .boton{
                border-radius: 10px;
                padding: 14px 10px 17px;
                text-align:center;
                color:white;
                font-size:16px;
            }
            `;
			var shadow = this.attachShadow({ mode: "open" });
			shadow.appendChild(style);

			var div = document.createElement("div");
			div.classList.add("boton");
			div.textContent = textoDeEntrada;
			div.style.backgroundColor = color;

			shadow.appendChild(div);
		}
	}
	customElements.define("button-el", Button);
}
