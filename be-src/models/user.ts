import { DataTypes, Model } from "sequelize";
import { sequelize } from "./conn";

export class User extends Model {}

User.init(
	{
		fullname: DataTypes.STRING,
		bio: DataTypes.STRING,
		pictureURL: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "user",
	}
);
