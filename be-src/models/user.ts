import { DataTypes, Model } from "sequelize";
import { sequelize } from "./conn";

export class User extends Model {}

User.init(
	{
		email: DataTypes.STRING,
		nombre: DataTypes.STRING,
		ubicacion: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "user",
	}
);
