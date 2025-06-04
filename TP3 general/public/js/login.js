const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/v1/pacientes/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (data?.data) {
      localStorage.setItem("token", data.data); // guardamos el token directamente
      alert("Login exitoso");
      window.location.href = "/"; // redirige a la home
    } else {
      alert(data.error || "Credenciales inválidas");
    }
  } catch (error) {
    console.error("Error al obtener el token:", error);
    alert("Error al iniciar sesión");
  }
});
