const MAPBOX_TOKEN =
	"pk.eyJ1Ijoibmloby1kZXYyMDIzIiwiYSI6ImNsa3F4aDJmdjFwcHEzb255MWZ1enZxbHkifQ.tMBEilBbPSw1T7_F76F-bg";
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

function initMap() {
	const coordenadasBase = [-58.381544733630555, -34.603654145067075];
	mapboxgl.accessToken = MAPBOX_TOKEN;
	return new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: coordenadasBase,
		zoom: 14,
	});
}

function initSearchForm(callback) {
	const form = document.querySelector(".search-form");
	const input = document.querySelector(".ubication-input");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		mapboxClient.geocodeForward(
			e.target.q.value,
			{
				country: "ar",
				autocomplete: true,
				language: "es",
			},
			function (err, data, res) {
				console.log(data);
				if (!err) callback(data.features);
			}
		);
	});
	if(input.value != ""){
		// Crea un evento de submit
		const eventoSubmit = new Event('submit', { bubbles: true });
		// Simula el clic en el elemento
		form.dispatchEvent(eventoSubmit);
	}
}

(function () {
	window.map = initMap();
	initSearchForm(function (results) {
		const firstResult = results[0];
		const marker = new mapboxgl.Marker()
			.setLngLat(firstResult.geometry.coordinates)
			.addTo(map);
		const [lng, lat] = firstResult.geometry.coordinates;
		map.setCenter(firstResult.geometry.coordinates);
		map.setZoom(14);
		console.log(marker)
	});
})();
