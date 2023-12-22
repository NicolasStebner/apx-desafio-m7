import { User } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function findOrCreateUser(email: string) {
	return await User.findOrCreate({
		where: { email: email },
		defaults: {
			email,
		},
	});
}

export async function findByEmailUser(email: string) {
	return await User.findOne({ where: { email } });
}
