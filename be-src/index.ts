import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Resend } from 'resend';
import { cloudinary } from "./lib/cloudinary";
import { findOrCreateUser, findByEmailUser } from "./controllers/users-controller";
import { checkEmailExist, checkEmailPassword, findOrCreateAuth, findByEmailAuth, findByPkAuth } from "./controllers/auth-controller";
import { borrarMascota, borrarUbicacionMascota, createMascota, findByPkMascota, getMascotaSegunIdReportador, guardarUbicacionMascota, mascotaEncontrada, mascotasCerca, updateMascota } from "./controllers/mascota-controller";

const port = process.env.PORT || 3005;
const app = express();
const resend = new Resend(process.env.API_KEY_RESEND);

app.use(express.static(path.join(__dirname, "../dist")));

app.use(
	express.json({
		limit: "50mb",
	})
);
app.use(cors());

app.get("/test", (req, res) => {
	
	res.json({ test: "ok" });
});

function getSHA256ofString(text: string) {
	//hash para password
	return crypto.createHash("sha256").update(text).digest("hex");
}

//Auth
app.post("/check-if-email-exists", async (req, res) => {
	const { email } = req.body;
	const existeEmail = checkEmailExist(email)
	res.json(existeEmail);
});

app.post("/signin", async (req, res) => {
	const { email, password } = req.body;
	if(email && password){
		const passwordHasheado = getSHA256ofString(password);
		const auth = await checkEmailPassword(email, passwordHasheado)
		if (auth) {
			const token = await jwt.sign(
				{ id: auth.get("user_id") },
				process.env.SECRET
				);
			res.json({ token });
		}
	}
});

app.post("/signup", async (req, res) => {
	const { email, password} = req.body;
	if(email && password){
		const passwordHasheado = getSHA256ofString(password)
		const [user, created] = await findOrCreateUser(email)
		const [auth, authCreated] = await findOrCreateAuth(user.get("id"),email,passwordHasheado)
		res.json(auth);
	}
});

app.post("/user/:email", async (req, res) => {
	const {email, nombre, ubicacion} = req.body
	const user = await findByEmailUser(req.body.email)
	if(nombre != "" && ubicacion != ""){
		await user.update({
			nombre: req.body.nombre,
			ubicacion: req.body.ubicacion,
		});
		res.status(200).json({ message: "updated" });
	}
});

app.post("/change-password/:email/:password", async (req, res) => {
	const { email, password } = req.body
	if(email){
		const auth = await findByEmailAuth(email)
		if (auth) {
			await auth.update({
			password: getSHA256ofString(password),
		});
		res.status(200).json({ message: "contraseña actualizada" });
		}
	}
});

//Mascota
app.post("/reportar-mascota/", async (req, res) => {
	const { nombre, fotoURL, ubicacion, idReportador, lat, lng } = req.body;
	const imagen = await cloudinary.uploader.upload(fotoURL, { //guarda la imagen en cloudinary
		resource_type: "image",
		discard_original_filename: true,
		width: 1000
	});
	const mascota = await createMascota(nombre,ubicacion,imagen.secure_url,idReportador)
	await guardarUbicacionMascota(mascota.getDataValue("id"),lat,lng)

	return res.json(mascota);
});

app.get("/get-id-by-email/:email", async (req, res) => {
	const {email} = req.params
	if(email != "null"){
		const rta = await findByEmailAuth(email)
		return res.json(rta["user_id"]);
	}
	res.json({})
});

app.get("/get-reports-by-id/:id", async (req, res) => {
	const {id} = req.params
	if(id){
		const rta = await getMascotaSegunIdReportador(id)
		return res.json(rta);
	}
});

app.get("/get-mascota-by-id/:id", async (req, res) => {
	const { id } = req.params
	if(id){
		const rta = await findByPkMascota(id)
		return res.json(rta);
	}
});
app.put("/guardar-mascota-by-id", async (req, res) => {
	const {id, nombre, fotoURL, ubicacion, idReportador} = req.body;
	const imagen = await cloudinary.uploader.upload(fotoURL, { //guarda la imagen en cloudinary
		resource_type: "image",
		discard_original_filename: true,
		width: 1000
	});
	const rta = await updateMascota(id, nombre, ubicacion, imagen.secure_url, idReportador)
	return res.json(rta);
});

app.put("/mascota-encontrada-by-id", async (req, res) => {
	const {id} = req.body
	if(id){
		const rta = await mascotaEncontrada(id)
		return res.json(rta);
	}
});

app.delete("/eliminar-mascota-by-id", async (req, res) => {
	const {id} = req.body
	if(id){
		const rta = await borrarMascota(id)
		await borrarUbicacionMascota(id)
		return res.json(rta);
	}
});

app.get("/get-mascotas-cerca", async (req, res) => {
	const { lat, lng } = req.query;
	const { hits } = await mascotasCerca(lat,lng,100000000)
	res.json(hits);
});

app.get("/get-email-by-id/:id", async(req,res)=>{
	const {id} = req.params
	const rta = await findByPkAuth(id)
	return res.json(rta)
});

app.post("/enviar-email", async(req,res)=>{
	const {to, subject} = req.body
	const {nombreReportador, telefono, informacion} = req.body.textBody
	try {
    const data = await resend.emails.send({
			"from": "petfinder@reportes.petfinder.com.ar",
			"to": to,
			"subject": subject,
			"html": `<p>Hola, soy ${nombreReportador}. Tengo información sobre <strong>first email</strong>!</p>`
		})
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
})
/* const staticDirPath = path.resolve(__dirname, "../fe-dist");
app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
	res.sendFile(staticDirPath + "/index.html");
}); */

app.listen(port, () => {
	console.log(`Pet Finder App Backend listening at http://localhost:${port}`);
});
