import * as express from "express";
import * as path from "path";
import { User, Mascota } from "./models";
import { updateProfile, getProfile } from "./controllers/users-controller";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
	express.json({
		limit: "50mb",
	})
);

app.post("/profile", async function (req, res) {
	if (!req.body) {
		res.status(400).json({
			message: "faltan datos en el body",
		});
	}
	const updatedData = await updateProfile(1, req.body);
	res.json(updatedData);
});

app.get("/profile", async function (req, res) {
	const profile = await getProfile(1);
	res.json(profile);
});
/*  */
const staticDirPath = path.resolve(__dirname, "../fe-dist");
app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
	res.sendFile(staticDirPath + "/index.html");
});

app.listen(PORT, () => {
	console.log(`example app listening at http://localhost:${PORT}`);
});
