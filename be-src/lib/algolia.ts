// For the search only version
import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.API_ID, process.env.API_KEY_ADMIN);
// index.saveObject({
// 		objectID: "1",
// 		_geoloc: {
// 			lat: 40.639751,
// 			lng: -73.778925,
// 		},
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});
// index.search("", {
// 		aroundLatLng: "40.71, -74.01",
// 		aroundRadius: 100000,
// 	})
// 	.then(({ hits }) => {
// 		console.log(hits);
// 	});
export { client };
