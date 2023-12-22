import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { User, Mascota, Auth } from "./models";
import { updateProfile, getProfile } from "./controllers/users-controller";
import { cloudinary } from "./lib/cloudinary";
import { client } from "./lib/algolia";
import { resend } from "./lib/resend";

const PORT = process.env.PORT || 3005;
const app = express();
const algoliaUserIndex = client.initIndex("users")
const algoliaMascotaIndex = client.initIndex("mascotas")
app.use(
	express.json({
		limit: "50mb",
	})
);
app.use(cors());

app.get("/test", (req, res) => {
	// algoliaUserIndex.saveObject({
	// 	objectID: "1",
	// 	cositas:"algo para guardar"
	// }).then((res) => {
	// 	console.log(res);
	// })
	// .catch((e) => {
	// 	console.log(e);
	// });
	res.json({ test: "ok" });
});

function getSHA256ofString(text: string) {
	//hash para password
	return crypto.createHash("sha256").update(text).digest("hex");
}

app.post("/check-if-email-exists", async (req, res) => {
	const { email } = req.body;

	const existeEmail = await Auth.findOne({
		where: { email: email },
	});

	res.json(existeEmail);
});

app.post("/signin", async (req, res) => {
	const { email, password } = req.body;
	const passwordHasheado = getSHA256ofString(password);
	const auth = await Auth.findOne({
		where: {
			email,
			password: passwordHasheado,
		},
	});
	if (auth) {
		const token = await jwt.sign(
			{ id: auth.get("user_id") },
			process.env.SECRET
		);
		res.json({ token });
	} else {
		res.status(400).json({ error: "email or pass incorrect" });
	}
});

app.post("/signup", async (req, res) => {
	const { email } = req.body;
	const [user, created] = await User.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			email,
		},
	});
	const [auth, authCreated] = await Auth.findOrCreate({
		where: { user_id: user.get("id") },
		defaults: {
			email,
			password: getSHA256ofString(req.body.password),
			user_id: user.get("id"),
		},
	});
	algoliaUserIndex.saveObject({
			objectID: user.get("id"),
			cositas:"algo para guardar"
		}).then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log(e);
		});

	res.json(auth);
});

app.post("/user/:email", async (req, res) => {
	const user = await User.findOne({ where: { email: req.body.email } });
	if (user) {
		await user.update({
			nombre: req.body.nombre,
			ubicacion: req.body.ubicacion,
		});
		res.status(200).json({ message: "updated" });
	} else {
		res.status(400).json({ message: "user not found" });
	}
});

app.post("/change-password/:email/:password", async (req, res) => {
	const auth = await Auth.findOne({ where: { email: req.body.email } });
	if (auth) {
		await auth.update({
			password: getSHA256ofString(req.body.password),
		});
		res.status(200).json({ message: "password updated" });
	} else {
		res.status(400).json({ message: "user not found" });
	}
});

app.post("/reportar-mascota/", async (req, res) => {
	const { nombre, fotoURL, ubicacion, idReportador } = req.body;

	const imagen = await cloudinary.uploader.upload(fotoURL, { //guarda la imagen en cloudinary
		resource_type: "image",
		discard_original_filename: true,
		width: 1000
	});
	
	const mascota = await Mascota.create({ //instancia la mascota y le agrega el link
		nombre: nombre,
		ubicacion: ubicacion,
		fotoURL: imagen.secure_url,
		idReportador: idReportador,
		perdido: true
	});

	algoliaMascotaIndex.saveObject({
		objectID: mascota.getDataValue("id"),
		_geoloc:{
			lat: req.body.lat,
			lng: req.body.lng
		}
	}).then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});	

	return res.json(mascota);
});

app.get("/get-id-by-email/:email", async (req, res) => {
	const rta = await Auth.findOne({
		where: {
			email: req.params.email,
		},
	});
	return res.json(rta["user_id"]);
});

app.get("/get-reports-by-id/:id", async (req, res) => {

	const rta = await Mascota.findAll({
		where: {
			idReportador: req.params.id,
		},
	});
	return res.json(rta);
});

app.get("/get-mascota-by-id/:id", async (req, res) => {
	const rta = await Mascota.findOne({
		where: {
			id: req.params.id,
		},
	});
	return res.json(rta);
});
app.put("/guardar-mascota-by-id", async (req, res) => {
	const imagen = await cloudinary.uploader.upload(req.body.fotoURL, { //guarda la imagen en cloudinary
		resource_type: "image",
		discard_original_filename: true,
		width: 1000
	});

	const rta = await Mascota.update({
		nombre: req.body.nombre,
		ubicacion: req.body.ubicacion,
		fotoURL: imagen.secure_url
	},{
		where: {
			id: req.body.id,
		},
	});
	return res.json(rta);
});

app.put("/mascota-encontrada-by-id", async (req, res) => {
	const rta = await Mascota.update({perdido: false},{
		where: {
			id: req.body.id,
		},
	});
	return res.json(rta);
});

app.delete("/eliminar-mascota-by-id", async (req, res) => {
	const rta = await Mascota.destroy({
		where: {
			id: req.body.id,
		},
	});
	algoliaMascotaIndex.deleteObject(req.body.id)
	return res.json(rta);
});
app.get("/get-mascotas-cerca", async (req, res) => {
	const { lat, lng } = req.query;
	const { hits } = await algoliaMascotaIndex.search("", {
		aroundLatLng: [lat, lng].join(","),
		aroundRadius: 100000000,
	});
	res.json(hits);
});

app.get("/get-email-by-id/:id", async(req,res)=>{
	const {id} = req.params
	const rta = await Auth.findByPk(id)
	return res.json(rta)
});

app.post("/enviar-email", async(req,res)=>{
	const {to, subject} = req.body
	const {nombreReportador, telefono, informacion} = req.body.textBody
	try {
    const data = await resend.emails.send({
			"from": process.env.FROM_EMAIL,
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

app.listen(PORT, () => {
	console.log(`example app listening at http://localhost:${PORT}`);
});
