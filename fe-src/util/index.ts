export function headerSetter(header,params){
  header.forEach((r)=>{
		r.addEventListener("click",()=>{
			params.goTo(`${r.classList[1]}`)
		})
	})
}