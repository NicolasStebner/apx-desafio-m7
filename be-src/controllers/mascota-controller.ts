import { Mascota } from "../models";
import { client } from "../lib/algolia";

export async function createMascota(nombre: string, ubicacion: string, fotoURL: string, idReportador: number) {
	return await Mascota.create({ nombre, ubicacion, fotoURL,idReportador, perdido: true});
}

export async function updateMascota(id,nombre: string, ubicacion: string, fotoURL: string, idReportador: number) {
	return await Mascota.update({nombre, ubicacion,fotoURL},{where: {id}});
}

export async function mascotaEncontrada(id) {
	return await Mascota.update({perdido: false},{where: {id}});
}

export async function borrarMascota(id) {
	return await Mascota.destroy({where: {id}});
}

export async function getMascotaSegunIdReportador(idReportador) {
	return Mascota.findAll({
		where: {
			idReportador,
		},
	});
}

export async function findByPkMascota(id: string) {
	return await Mascota.findByPk(id)
}

export async function guardarUbicacionMascota(id, lat: string, lng: string) {
	const algoliaMascotaIndex = client.initIndex("mascotas")
	return await algoliaMascotaIndex.saveObject({
			objectID: id,
		_geoloc:{
			lat,lng
		}
		}).then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log(e);
		});
}

export async function borrarUbicacionMascota(id: string) {
	const algoliaMascotaIndex = client.initIndex("mascotas")
	return await algoliaMascotaIndex.deleteObject(id)
}

export async function mascotasCerca(lat,lng,radio) {
	const algoliaMascotaIndex = client.initIndex("mascotas")
	return await algoliaMascotaIndex.search("", {aroundLatLng: [lat, lng].join(","), aroundRadius: radio,});
}

export async function mascotaCercaById(id){
	const algoliaMascotaIndex = client.initIndex("mascotas")
	return await algoliaMascotaIndex.getObject(id)
}

