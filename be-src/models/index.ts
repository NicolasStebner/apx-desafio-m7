import { User } from "./user";
import { Mascota } from "./mascota";

User.hasMany(Mascota);
Mascota.belongsToMany(User); //poder modificar que tenga un solo dueño o mas, esperar que no rompa

export { User, Mascota };
