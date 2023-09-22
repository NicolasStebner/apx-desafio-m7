import { initPageWelcome } from "./pages/home";
import { initHomeMascotas } from "./pages/home-mascotas";
import { initLogin } from "./pages/login";
import { initLoginPassword } from "./pages/login-password";
import { initSignUp } from "./pages/signup";
import { initProfile } from "./pages/profile";
import { initProfileDatosPersonales } from "./pages/profile-datos-personales";
import { initProfileCambiarContrasenia } from "./pages/profile-contrasenia";
import { initNotReports } from "./pages/mis-reportes-vacio";
const routes = [
	{
		path: /\/home/,
		component: initPageWelcome,
	},
	{
		path: /\/home-mascotas/,
		component: initHomeMascotas,
	},
	{
		path: /\/login/,
		component: initLogin,
	},
	{
		path: /\/login-password/,
		component: initLoginPassword,
	},
	{
		path: /\/signup/,
		component: initSignUp,
	},
	{
		path: /\/profile/,
		component: initProfile,
	},
	{
		path: /\/profile-datos-personales/,
		component: initProfileDatosPersonales,
	},
	{
		path: /\/profile-cambiar-contrasenia/,
		component: initProfileCambiarContrasenia,
	},
	{
		path: /\/mis-reportes-vacio/,
		component: initNotReports,
	},
];

export function initRouter(container: Element) {
	function goTo(path) {
		history.pushState({}, "", path);
		handleRoute(path);
	}
	async function handleRoute(route) {
		for (const r of routes) {
			if (r.path.test(route)) {
				const el = await r.component({ goTo: goTo });
				if (container.firstChild) {
					container.firstChild?.remove();
				}
				container.appendChild(el);
			}
		}
	}
	if (location.pathname == "/") {
		goTo("/home");
	} else {
		handleRoute(location.pathname);
	}
	window.onpopstate = () => {
		handleRoute(location.pathname);
	};
}
