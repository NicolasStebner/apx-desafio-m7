import { DataTypes, Model } from "sequelize";
import { sequelize } from "./conn";

export class Mascota extends Model {}
//modificar los campos
Mascota.init(
	{
		title: DataTypes.STRING,
		price: DataTypes.INTEGER,
	},
	{
		sequelize,
		modelName: "mascota",
	}
);
