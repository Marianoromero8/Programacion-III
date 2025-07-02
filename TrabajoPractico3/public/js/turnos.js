document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión');
    window.location.href = '/login';
    return;
  }

  try {
    const response = await fetch('/api/v1/turnos/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      alert('Sesión inválida o expirada');
      window.location.href = '/login';
      return;
    }

    if (!response.ok) {
      if (response.status === 404) {
        // Lista vacía, mostrar mensaje en la tabla
        renderMensaje('No hay turnos registrados.');
      } else {
        alert('Error al cargar los turnos');
      }
      return;
    }

    const turnos = await response.json();
    renderTurnos(turnos);

  } catch (error) {
    console.error('Error al cargar turnos:', error);
  }
});

function renderTurnos(turnos) {
  const tbody = document.getElementById('tabla-turnos-body');
  tbody.innerHTML = '';

  turnos.forEach(turno => {
    const paciente = turno.paciente || {};

    const infoPaciente = paciente.id
    
      ? `${paciente.id} - ${paciente.nombre || ''} ${paciente.apellido || ''} - ${paciente.email || ''}`.trim()
      : 'Paciente no disponible';

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${turno.id}</td>
      <td>${turno.fecha}</td>
      <td>${turno.hora}</td>
      <td>${turno.motivo}</td>
      <td>${infoPaciente}</td>
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


function renderMensaje(msg) {
  const tbody = document.getElementById('tabla-turnos-body');
  // ocupamos toda la fila con el mensaje
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">${msg}</td></tr>`;
}

