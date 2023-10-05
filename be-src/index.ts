import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { User, Mascota, Auth } from "./models";
import { updateProfile, getProfile } from "./controllers/users-controller";
const PORT = process.env.PORT || 3005;
const app = express();

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

app.post("/check-if-email-exists", async (req, res) => {
	const { email } = req.body;

	const existeEmail = await Auth.findOne({
		where: { email: email },
	});
	//console.log(existeEmail);
	//console.log("existe este email?", existeEmail);

	//Hardcodeado para crear y luego testear si existe
	/* await Auth.create({ email: "test@test.com" }); */

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
	console.log(auth);

	if (auth) {
		await auth.update({
			password: getSHA256ofString(req.body.password),
		});
		res.status(200).json({ message: "password updated" });
	} else {
		res.status(400).json({ message: "user not found" });
	}
});
/* const staticDirPath = path.resolve(__dirname, "../fe-dist");
app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
	res.sendFile(staticDirPath + "/index.html");
}); */

app.listen(PORT, () => {
	console.log(`example app listening at http://localhost:${PORT}`);
});
