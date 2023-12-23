import { DataTypes, Model } from "sequelize";
import { sequelize } from "./conn";

export const Auth = sequelize.define('auth',{
	email:{
		type: DataTypes.STRING,
	},
	password:{
		type: DataTypes.STRING
	},
	user_id:{
		type: DataTypes.INTEGER
	}
})
//modificar los campos
// Auth.init(
// 	{
// 		email: DataTypes.STRING,
// 		password: DataTypes.STRING,
// 		user_id: DataTypes.INTEGER,
// 	},
// 	{
// 		sequelize,
// 		modelName: "auth",
// 	}
// );
