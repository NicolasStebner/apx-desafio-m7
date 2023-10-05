import { User } from "./user";
import { Mascota } from "./mascota";
import { Auth } from "./auth";

User.hasMany(Mascota);
Mascota.belongsTo(User);

export { User, Mascota, Auth };
