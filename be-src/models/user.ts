import { DataTypes, Model } from "sequelize";
import { sequelize } from "./conn";

export const User = sequelize.define('user',{
	email:{
		type: DataTypes.STRING
	},
	nombre:{
		type: DataTypes.STRING
	},
	ubicacion:{
		type: DataTypes.STRING
	}
})

// User.init(
// 	{
// 		email: DataTypes.STRING,
// 		nombre: DataTypes.STRING,
// 		ubicacion: DataTypes.STRING,
// 	},
// 	{
// 		sequelize,
// 		modelName: "user",
// 	}
// );
