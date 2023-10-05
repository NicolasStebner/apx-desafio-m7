import { Sequelize, DataTypes, Model } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URL);

/* sequelize.sync({ force: true }); */

export { sequelize };
