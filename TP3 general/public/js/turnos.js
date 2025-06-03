/* document.addEventListener('DOMContentLoaded', async () => {
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

        // if (!response.ok) {
        //     alert('Sesión inválida o expirada');
        //     window.location.href = '/login';
        //     return;
        // }
        if (response.status === 401) {
            alert('Sesión inválida o expirada');
            window.location.href = '/login';
            return;
        }

        if (!response.ok) {
            // Aquí podés manejar otros errores, pero no asumas que es por token
            alert('Error al cargar los turnos');
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
        const fila = document.createElement('tr');
        fila.innerHTML = `
      <td>${turno.id}</td>
      <td>${turno.fecha}</td>
      <td>${turno.hora}</td>
      <td>${turno.motivo}</td>
      <td>${turno.pacienteId}</td>
      <td>
        <button>Actualizar</button>
        <button>Eliminar</button>
      </td>
    `;
        tbody.appendChild(fila);
    });
} */

/* document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión');
        window.location.href = '/login';
        return;
    }

    // try {
    //     const response = await fetch('/api/v1/turnos/', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });

    //     if (response.status === 401) {
    //         alert('Sesión inválida o expirada');
    //         window.location.href = '/login';
    //         return;
    //     }

    //     if (!response.ok) {
    //         alert('Error al cargar los turnos');
    //         return;
    //     }

    //     const turnos = await response.json();
    //     renderTurnos(turnos);
    // } catch (error) {
    //     console.error('Error al cargar turnos:', error);
    // }
    try {
        const response = await fetch('/api/v1/turnos/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // para ver porque no esta el mensaje
        console.log('Respuesta fetch turnos:', response);

        if (response.status === 401) {
            alert('Sesión inválida o expirada');
            window.location.href = '/login';
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.mensaje || 'Error al cargar los turnos');
            return;
        }
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     alert(`Error al cargar los turnos: ${errorData.mensaje || errorData.message || 'Error desconocido'}`);
        //     return;
        // }

        const turnos = await response.json();
        renderTurnos(turnos);
    } catch (error) {
        console.error('Error al cargar turnos:', error);
        alert('Error de red o inesperado al cargar los turnos.');
    }

});

function renderTurnos(turnos) {
    const tbody = document.getElementById('tabla-turnos-body');
    tbody.innerHTML = '';

    if (turnos.length === 0) {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td colspan="6" style="text-align:center;">No hay turnos disponibles.</td>`;
        tbody.appendChild(fila);
        return;
    }

    turnos.forEach(turno => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${turno.id}</td>
            <td>${turno.fecha}</td>
            <td>${turno.hora}</td>
            <td>${turno.motivo}</td>
            <td>${turno.pacienteId}</td>
            <td>
                <button>Actualizar</button>
                <button>Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
} */

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
        // Lista vacía, mostrar mensaje en la tabla sin alert
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
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${turno.id}</td>
      <td>${turno.fecha}</td>
      <td>${turno.hora}</td>
      <td>${turno.motivo}</td>
      <td>${turno.pacienteId}</td>
      <td>
        <button>Actualizar</button>
        <button>Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function renderMensaje(msg) {
  const tbody = document.getElementById('tabla-turnos-body');
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">${msg}</td></tr>`;
}
