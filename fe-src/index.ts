import { initRouter } from "./router";
import { init as buttonEl } from "./components/button-el";
import { init as headerEl } from "./components/header-el";
import { init as titleEl } from "./components/title-el";
import { init as subtitleEl } from "./components/subtitle-el";
import { init as imgEl } from "./components/img-el";
import { init as inputEl } from "./components/input-el";

function initComponents() {
	buttonEl();
	headerEl();
	titleEl();
	subtitleEl();
	imgEl();
	inputEl();
}
(function () {
	initComponents();
	initRouter(document.querySelector(".root")!);
})();
