import { DataTypes, Model } from "sequelize";
import { sequelize } from "./conn";

export const Mascota = sequelize.define('mascota',{
	nombre:{
		type:DataTypes.STRING
	},
	ubicacion:{
		type:DataTypes.STRING
	},
	fotoURL:{
		type:DataTypes.STRING
	},
	idReportador:{
		type:DataTypes.INTEGER
	},
	perdido:{
		type:DataTypes.BOOLEAN
	}
})
//modificar los campos
// Mascota.init(
// 	{
// 		nombre: DataTypes.STRING,
// 		ubicacion: DataTypes.STRING,
// 		fotoURL: DataTypes.STRING,
// 		idReportador: DataTypes.INTEGER,
// 		perdido: DataTypes.BOOLEAN
// 	},
// 	{
// 		sequelize,
// 		modelName: "mascota",
// 	}
// );
