import React from 'react'
import { useEffect } from 'react'

export default function TraerPersona({ personas }) {

    return (
        <div>
            <ListaTarjeta personas={fetchPersonas}></ListaTarjeta>
        </div>
    )
}
