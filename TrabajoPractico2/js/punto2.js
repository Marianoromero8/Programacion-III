function addList(){
    let buttonAdd = document.querySelector(".button_add")
    let buttonDelete = document.querySelector(".button_delete")
    let listaul = document.querySelector(".lista")
    
    
    buttonAdd.addEventListener("click", () => {
            let value = document.querySelector(".input").value
            if(value.length > 0){
            const nuevali = document.createElement("li")
            nuevali.textContent = value
            nuevali.classList.add(".lista-li")
            listaul.appendChild(nuevali)
            document.querySelector(".input").value = ""
        } else {
            alert ("Te falta escribir algo")
        }
        })


        buttonDelete.addEventListener("click", () => {
            const ul = listaul.getElementsByTagName("li")
            if(ul.length > 0){
                const ultimoli = ul[ul.length - 1]
                listaul.removeChild(ultimoli)
            } else{
                alert("No hay para eliminar")
            }
        })
    
    
}

function deleteList(){
   
}

addList()