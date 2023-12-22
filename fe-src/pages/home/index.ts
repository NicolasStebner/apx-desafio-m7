export async function initPageWelcome(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
	<header-el></header-el>
	<main class="main">
		<img-el class="img" asset="home_img" alt="permissions"></img-el>
		<title-el class="title centrado" color="#EB6372" label="Pet Finder App"></title-el>
		<subtitle-el class="subtitle centrado" label="Encontrá y reportá mascotas perdidas cerca de tu ubicación"></subtitle-el>
		<button-el class="button ubicacion" color="#5A8FEC" label="Dar mi ubicacion actual"></button-el>
		<button-el class="button comoFunciona" color="#00A884"label="¿Cómo funciona Pet Finder?"></button-el>
	</main>
    `;
	const buttonUbicacionEl = div.querySelector(".ubicacion");
	buttonUbicacionEl.addEventListener("click", () => {
		console.log(navigator.geolocation)
		if (navigator.geolocation) {
			// Obtiene la ubicación actual del usuario
			navigator.geolocation.getCurrentPosition(function (position) {
				const latitud = position.coords.latitude;
				const longitud = position.coords.longitude;
				// Ahora puedes usar estas coordenadas con Mapbox
				sessionStorage.setItem("lat_user",latitud.toString())
				sessionStorage.setItem("lng_user",longitud.toString())
				// Aquí puedes agregar tu lógica para utilizar Mapbox con las coordenadas obtenidas
				params.goTo("/mascota-cerca");
			}, function (error) {
				console.error(`Error al obtener la ubicación: ${error.message}`);
			});
		}else{
			alert("Tu navegador no soporta esta versión, intentelo más tarde")
		}
	});
	const buttonComoFuncionaEl = div.querySelector(".comoFunciona");
	buttonComoFuncionaEl.addEventListener("click",()=>{
		params.goTo("/como-funciona-pet-finder")
	})
	return div;
}
