import { Sequelize, DataTypes, Model } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URL);

/* async function connSeq() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully");
	} catch (error) {
		console.log("Unable to connect to the database", error);
	}
}
connSeq(); */

/* sequelize.sync({ force: true }); */

export { sequelize };
