const titulo = document.getElementById("tituloPrincipal");
titulo.textContent = "Titulo modificado con javascript";


const parrafos = document.getElementsByClassName("parrafo");
for (let i = 0; i < parrafos.length; i++) { 
    parrafos[i].style.color = "Red"; 
}

const listas = document.querySelectorAll("#contenedor li"); 
listas.forEach((li, index) => {
    li.textContent += ` (ítem #${index + 1})`;
});