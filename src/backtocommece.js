import React from 'react'
import { Link } from 'react-router-dom'


function backtocommece() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <h1 style={{textTransform: 'uppercase'}}>
                gracias por confiar en nosotros
            </h1>
            <Link to='/suscribe' style={{float: 'right', margin: '20px', textDecoration: 'none', color: 'black'}}>
                <button style={{backgroundColor: '#4F4F4F', padding: '30px', color: 'white', fontSize: '20px', cursor: 'pointer'}}>
                    ir a suscripciones activas
                </button>
            </Link>
        </div>
    )
}

export default backtocommece