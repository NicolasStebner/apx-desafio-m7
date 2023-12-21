export function init() {
	class Input extends HTMLElement {
		constructor() {
			super();
			this.refactor();
		}
		refactor() {
			const textoDeEntrada = this.getAttribute("label");
			const textoPlaceHolder: any = this.getAttribute("placeholder");
			const type = this.getAttribute("type") || "text";
			const defaultValue = this.getAttribute("defaultValue") || "";
			var style = document.createElement("style");
			style.textContent = `
            *{
                box-sizing: border-box;
            }
            :host{
                display:block;
            }
			.contenedorInput{
				margin:0 auto 20px;
				max-width:300px; /* modificar */
			}
            .label{
                font-size:18px;
				margin-bottom:10px;
            }
            .input{
                border: none;
                border:solid 1px black;
                border-radius:4px;
                box-shadow:none;
                width:100%;
				padding:10px 20px;
            }
            `;
			var shadow = this.attachShadow({ mode: "open" });
			shadow.appendChild(style);
			var divComponenteEntero = document.createElement("div");
			divComponenteEntero.classList.add("contenedorInput");

			var divLabel = document.createElement("div");
			divLabel.classList.add("label");
			divLabel.textContent = textoDeEntrada;

			var divInput = document.createElement("input");
			divInput.classList.add("input");
			divInput.setAttribute("type", type);
			divInput.placeholder = textoPlaceHolder;
			divInput.setAttribute("value",defaultValue)

			divComponenteEntero.appendChild(divLabel);
			divComponenteEntero.appendChild(divInput);

			shadow.appendChild(divComponenteEntero);
		}
	}
	customElements.define("input-el", Input);
}
