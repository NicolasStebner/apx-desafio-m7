import { API_BASE_URL } from "./db";

const state = {
	data: {
		email: "",
		ubicacion: "" /* posible modificacion */,
	},
	async getState() {
		return this.data;
	},
	async setEmail(email: string) {
		const gs = await this.getState();
		gs.email = email;
	},
	async getEmail() {
		const gs = await this.getState();
		return gs.email;
	},
	async logOut() {
		const gs = await this.getState();
		gs.email = "";
	},
	async setNombreAndLocalidad(nombre: string, ubicacion: string) {
		const gs = await this.getState();
		const user = await fetch(`${API_BASE_URL}/user/:email`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email: gs.email, nombre, ubicacion }),
		});
		const data = await user.json();
		return data;
	},
	async chequeoExistenciaEmail(email: string) {
		const rta = await fetch(`${API_BASE_URL}/check-if-email-exists`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email: email }),
		});
		const data = await rta.json();
		return data;
	},
	async signIn(email: string, password: string) {
		const rta = await fetch(`${API_BASE_URL}/signin`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await rta.json();
		const { error } = data;
		if (!error) {
			this.setEmail(email);
			return data;
		} else {
			return false;
		}
	},
	async signUp(email: string, password: string) {
		const rta = await fetch(`${API_BASE_URL}/signup`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await rta.json();
		this.setEmail(email);
		return data;
	},
	async cambiarContrasenia(nuevaContrasenia: string) {
		const gs = await this.getState();
		if (gs.email) {
			const rta = await fetch(
				`${API_BASE_URL}/change-password/:email/:password`,
				{
					method: "post",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({ email: gs.email, password: nuevaContrasenia }),
				}
			);
			const data = await rta.json();
			return data;
		} else {
			return false;
		}
	},
	async mascotasCerca() {
		/* pedir la ubicacion de la data, buscar con *herramienta* las mascotas alrededor */
	},
	async misReportes() {},
};

export { state };
