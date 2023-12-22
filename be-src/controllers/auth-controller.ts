import { Auth } from "../models";

export async function checkEmailExist(email) {
	return await Auth.findOne({
		where: { email: email },
	});
}

export async function checkEmailPassword(email, passwordHasheado) {
	return await Auth.findOne({
		where: {
			email,
			password: passwordHasheado,
		},
	});
}

export async function findOrCreateAuth(user_id, email, passwordHasheado) {
	return await Auth.findOrCreate({
		where: { user_id },
		defaults: {
			email,
			password: passwordHasheado,
			user_id,
		},
	});
}

export async function findByEmailAuth(email: string) {
	return await Auth.findOne({ where: { email } });
}

export async function findByPkAuth(id) {
	return await Auth.findByPk(id);
}