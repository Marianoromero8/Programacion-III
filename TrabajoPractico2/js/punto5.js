function enviarFormulario(event) {
    const textoEmail = document.getElementById('email').value;
    const textoNombre = document.getElementById('texto').value;
    const textoEdad = document.getElementById('edad').value;
    event.preventDefault();
    const resultadoNombre = document.getElementById('resultadoNombre');
    const resultadoEdad = document.getElementById('resultadoEdad');
    const resultadoEmail = document.getElementById('resultadoEmail');

    if (textoEmail.includes("@") && textoEmail.includes(".com") && (textoEmail.length > 0)){
        resultadoEmail.innerHTML = '<p>Email guardardo!</p>'
    }
    else {
        resultadoEmail.innerHTML = '<p>Ingrese un email valido.</p>'
    }

    if (textoEdad > 17) {
        resultadoEdad.innerHTML = '<p>Edad guardada!</p>'
    }
    else {
        resultadoEdad.innerHTML = '<p>Ingrese una edad valida (+18)</p>'
    }

    if (textoNombre === ""){
        resultadoNombre.innerHTML = '<p>Ingrese un nombre valido</p>'
    }
    
    else {
        resultadoNombre.innerHTML = '<p>Nombre registrado!</p>'
    }
}




