import { User, Mascota, Auth } from "./models";
User.sequelize.sync({ force: true }).then((res) => {
	console.log(res);
});
Auth.sequelize.sync({ force: true }).then((res) => {
	console.log(res);
});
