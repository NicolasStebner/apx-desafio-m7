import { DataTypes, Model } from "sequelize";
import { sequelize } from "./conn";

export class Mascota extends Model {}
//modificar los campos
Mascota.init(
	{
		nombre: DataTypes.STRING,
		ubicacion: DataTypes.STRING,
		fotoURL: DataTypes.STRING,
		idReportador: DataTypes.INTEGER,
		perdido: DataTypes.BOOLEAN
	},
	{
		sequelize,
		modelName: "mascota",
	}
);
