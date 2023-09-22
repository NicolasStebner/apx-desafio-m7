export function init() {
	class Header extends HTMLElement {
		constructor() {
			super();
			this.refactor();
		}
		refactor() {
			var style = document.createElement("style");
			style.textContent = `
            :host{
                display:block;
            }
            .header{
                width:100%;
                background-color:#26302E;
                height:50px;
                color:white;
            }
            `;
			var shadow = this.attachShadow({ mode: "open" });
			shadow.appendChild(style);

			var div = document.createElement("div");
			div.classList.add("header");

			shadow.appendChild(div);
		}
	}
	customElements.define("header-el", Header);
}
