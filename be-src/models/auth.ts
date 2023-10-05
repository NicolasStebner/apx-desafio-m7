import { DataTypes, Model } from "sequelize";
import { sequelize } from "./conn";

export class Auth extends Model {}
//modificar los campos
Auth.init(
	{
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		user_id: DataTypes.INTEGER,
	},
	{
		sequelize,
		modelName: "auth",
	}
);
