import TarjetaPersona from '../TarjetaPersona/TarjetaPersona'

export default function ListaTarjeta({ personas }) {
    return (
        <div>
            <h1>Personas</h1>
            <TarjetaPersona personas={personas} />
        </div>
    )
}
