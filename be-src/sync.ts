import { User, Mascota } from "./models";
User.sequelize.sync({ alter: true }).then((res) => {
	console.log(res);
});
