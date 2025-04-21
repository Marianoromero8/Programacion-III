export function puntoTres(){
    const botonResaltar = document.getElementById("boton-resaltar")
    const botonOcultor = document.getElementById("boton-ocultar")
    const parrafos = document.querySelectorAll(".parrafo")

    botonResaltar.addEventListener("click", () => {
        parrafos.forEach((parr) => {
            parr.classList.toggle("resaltado")
        })
    })

    botonOcultor.addEventListener("click", () => {
        parrafos.forEach((parr) => {
            parr.classList.toggle("oculto")
        })
    })
}

puntoTres()