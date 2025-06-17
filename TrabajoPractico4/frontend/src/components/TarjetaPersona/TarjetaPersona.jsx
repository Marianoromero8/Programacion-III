
export default function TarjetaPersona({ personas }) {

    return (
        <div>
            {personas.map(persona => (
                <div key={persona.id}>
                    <p>Nombre: {persona.nombre}</p>
                    <p>Apellido: {persona.apellido}</p>
                    <p>Edad: {persona.edad}</p>
                    <p>Email: {persona.email}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}
