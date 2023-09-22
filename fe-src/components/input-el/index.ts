export function init() {
	class Input extends HTMLElement {
		constructor() {
			super();
			this.refactor();
		}
		refactor() {
			const textoDeEntrada = this.getAttribute("label");
			const textoPlaceHolder: any = this.getAttribute("placeholder");
			var style = document.createElement("style");
			style.textContent = `
            *{
                box-sizing: border-box;
            }
            :host{
                display:block;
            }
            .label{
                font-size:18px;
            }
            .input{
                border: none;
                border:solid 1px black;
                border-radius:4px;
                box-shadow:none;
                height:55px;
                width:100%
            }
            `;
			var shadow = this.attachShadow({ mode: "open" });
			shadow.appendChild(style);

			var divLabel = document.createElement("div");
			divLabel.classList.add("label");
			divLabel.textContent = textoDeEntrada;

			var divInput = document.createElement("input");
			divInput.classList.add("input");
			divInput.placeholder = textoPlaceHolder;

			shadow.appendChild(divLabel);
			shadow.appendChild(divInput);
		}
	}
	customElements.define("input-el", Input);
}
