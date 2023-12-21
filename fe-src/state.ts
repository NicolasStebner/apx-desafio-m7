import { API_BASE_URL } from "./db";

const state = {
	data: {
		email: "",
		ubicacion: "" /* posible modificacion */,
	},
	async init() {
		// if(sessionStorage.getItem("useremail") != ""){
			// sessionStorage.setItem("useremail", "");
		// }
	},
	async getState() {
		return this.data;
	},
	async setEmail(email: string) {
		const gs = await this.getState();
		gs.email = email;
		sessionStorage.setItem("useremail", email);
	},
	async getEmail() {
		const email = sessionStorage.getItem("useremail");
		return email;
	},
	async logOut() {
		const gs = await this.getState();
		gs.email = "";
		sessionStorage.removeItem("useremail");
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
	async publicarReporteMascota(
		nombre: string,
		urlImagen: string,
		ubicacion: string
	) {
		const idReportador = await this.getIdUserByEmail();
		const rta = await fetch(`${API_BASE_URL}/reportar-mascota/`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				nombre: nombre,
				fotoURL: urlImagen,
				ubicacion: ubicacion,
				idReportador: idReportador,
			}),
		});
		return rta.json();
	},
	async getIdUserByEmail() {
		const email = sessionStorage.getItem("useremail");
		const user_id = await fetch(`${API_BASE_URL}/get-id-by-email/${email}`)
		const IdReportador = await user_id.json()
		return IdReportador;
	},
	async mascotasCerca() {
		/* pedir la ubicacion de la data, buscar con *herramienta* las mascotas alrededor */
	},
	async misReportes() {
		const user_id = await this.getIdUserByEmail()
		const data = await fetch(`${API_BASE_URL}/get-reports-by-id/${user_id}`)
		const rta = await data.json()
		return rta
	},
	async getMascotaById(){
		const id = sessionStorage.getItem("mascota_id")
		const data = await fetch(`${API_BASE_URL}/get-mascota-by-id/${id}`)
		const rta = await data.json()
		sessionStorage.setItem("mascota",JSON.stringify(rta))
		return rta;
	},
	async updateMascota(nombre, imagen, ubicacion){
		const id = sessionStorage.getItem("mascota_id")
		const data = await fetch(`${API_BASE_URL}/guardar-mascota-by-id`,{
			method: "put",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				nombre: nombre,
				fotoURL: imagen,
				ubicacion: ubicacion,
			}),
		})
		const rta = await data.json();
		return rta
	},
	async mascotaEncontrada(){
		const id = sessionStorage.getItem("mascota_id")
		const data = await fetch(`${API_BASE_URL}/mascota-encontrada-by-id`,{
			method: "put",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				id: id
			}),
		})
		const rta = await data.json();
		return rta
	},
	async eliminarMascota(){
		const id = sessionStorage.getItem("mascota_id")
		const data = await fetch(`${API_BASE_URL}/eliminar-mascota-by-id`,{
			method: "delete",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				id: id
			}),
		})
		const rta = await data.json();
		return rta
	}
};

export { state };
