/* document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form?.addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita recargar la página

    const formData = new FormData(form);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('/api/v1/pacientes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const token = await response.text();
        alert('Login correcto');
        localStorage.setItem('token', token);
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || 'Credenciales incorrectas'));
      }
    } catch (error) {
      alert('Error en el servidor');
    }
  });
}); */

/* form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('/api/v1/pacientes/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const token = await response.text();  // ¡Texto plano!
      console.log('Token recibido:', token);
      

      //localStorage.setItem('token', token);
      alert('Login correcto');
    } else {
      const errorData = await response.json();
      alert('Error: ' + (errorData.message || 'Credenciales incorrectas'));
    }
  } catch (error) {
    alert('Error en el servidor');
  }
}); */

//const form = document.querySelector(".form_login");
/* const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("api/v1/pacientes/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (data?.data) {
            const event = new CustomEvent("tokenReceived", { detail: data.data });
            document.dispatchEvent(event);
            alert("Login exitoso");
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error al obtener el token:", error);
    }
}); */

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
      window.location.href = "/"; // redirige a la home o donde prefieras
    } else {
      alert(data.error || "Credenciales inválidas");
    }
  } catch (error) {
    console.error("Error al obtener el token:", error);
    alert("Error al iniciar sesión");
  }
});
