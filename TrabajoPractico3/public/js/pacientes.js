// pacientes.js (frontend)
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión');
    window.location.href = '/login';
    return;
  }

  try {
    const response = await fetch('/api/v1/pacientes/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    if (!response.ok) {
      alert('Sesión inválida o expirada');
      window.location.href = '/login';
      return;
    }

    const data = await response.json();
    // renderiza los datos en la página
    renderPacientes(data);
  } catch (error) {
    console.error(error);
  }
});

function renderPacientes(pacientes) {
  const tbody = document.getElementById('tabla-pacientes-body');
  tbody.innerHTML = ''; // Limpiar cualquier contenido previo

  pacientes.forEach(paciente => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${paciente.id}</td>
      <td>${paciente.nombre}</td>
      <td>${paciente.apellido}</td>
      <td>
        <button class="btn btn-actualizar">
          Actualizar
        </button>
        <button class="btn btn-eliminar">
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}
