import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'


function validate() {
    let login = document.getElementById('login').value
    let password = document.getElementById('password').value
    axios.post('https://apidev.tools.antpack.co/thebeautyclub/api/auth/login', {email: login, password: password}).then((res) => {
        sessionStorage.setItem('token', res.headers.authorization)
        console.log(sessionStorage.getItem('token'))
        window.open('/home', '_self')
    }).catch((e) => {
        console.log("error ***************", e)
    })
}


function login () {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh'}}>
            <h1>Iniciar sesion</h1>
            {/* <button style={{margin: '50px 20px', padding: '10px 20px', backgroundColor: '#4F4F4F', color: 'white'}}>registrer</button> */}
             <input type="text" id="login" style={{padding: '10px 30px', margin: '20px'}} placeholder="Username"></input>
             <input type="password" id="password" style={{padding: '10px 30px', margin: '20px'}} placeholder="Password"></input>
             <button style={{margin: '0', padding: '10px 20px', backgroundColor: '#4F4F4F', color: 'white'}} onClick={validate}>Login</button>
        </div>
    )   
}



export default login