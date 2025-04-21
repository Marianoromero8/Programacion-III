document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("inputItem");
    const button = document.getElementById("btnenviar");
    const ul = document.querySelector("ul");

    button.addEventListener("click", function (e) {
        e.preventDefault();
        const value = input.value.trim();
        if (value !== "") {
            const li = document.createElement("li");
            li.textContent = value;

            li.addEventListener("click", function () {
                li.classList.toggle("completado");
            });

            ul.appendChild(li);
            input.value = "";
        }
    });
});