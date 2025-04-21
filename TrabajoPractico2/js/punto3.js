export function puntoTres(){
    const botonResaltar = document.getElementById("boton-resaltar")
    const botonOcultor = document.getElementById("boton-ocultar")
    const parrafos = document.querySelectorAll(".parrafo")

    botonResaltar.addEventListener("click", () => {
        parrafos.forEach((parr) => {
            parr.classList.add("resaltado")
        })
    })

    botonOcultor.addEventListener("click", () => {
        parrafos.forEach((parr) => {
            parr.classList.add("oculto")
        })
    })
}

puntoTres()