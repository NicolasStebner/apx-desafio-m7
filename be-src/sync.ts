import { User, Mascota, Auth } from "./models";
import { sequelize } from "./models/conn";
User.sequelize.sync({ force: true }).then((res) => {
	console.log(res);
});
Auth.sequelize.sync({ force: true }).then((res) => {
	console.log(res);
});
Mascota.sequelize.sync({ force: true }).then((res) => {
	console.log(res);
});

// sequelize.sync({force:true})