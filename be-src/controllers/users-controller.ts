import { User, Mascota } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function createProduct(userId: number, productData) {
	/* if (!userId) {
		throw "userId es necesario";
	}
	const user = await User.findByPk(userId);
	if (user) {
		const product = await Product.create({
			...productData,
			userId: user.get("id"),
		});
		return product;
	} else {
		throw "error,user not found";
	} */
	return true;
}

export async function updateProfile(userId, updateData) {
	/* if (updateData.pictureDataURL) {
		const imagen = await cloudinary.uploader.upload(updateData.pictureDataURL, {
			resource_type: "image",
			discard_original_filename: true,
			width: 1000,
		});
		const updateDataComplete = {
			fullname: updateData.fullname,
			bio: updateData.bio,
			pictureURL: imagen.secure_url,
		};
		
		await User.update(updateDataComplete, {
			where: {
				id: userId,
			},
		});
		return updateDataComplete;
	} else {
		console.error("no hay imagen adjunta");
	} */
	return true;
}

export async function getProfile(userId) {
	/* const userProfile = await User.findByPk(userId);
	return userProfile; */
	return true;
}
