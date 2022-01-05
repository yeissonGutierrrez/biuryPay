import React, {useState, useEffect} from 'react'
import paytoplace from "./placetopay-logo.svg";
import logo from './logo.svg';
import shopping from './shopping-cart-solid.svg';
import image from './image.svg';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import './App.css';
import { width } from "@mui/system";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from 'react-router-dom';


let plan;
const search = window.location.search
const sus = new URLSearchParams(search).get("suscription")

  



function App() {
  const [iframe, setiframe] = useState(false)

  if (sus == 'mensual') {
    plan = '20000'
  }
  if (sus == 'trimestral') {
    plan = '50000'
  }
  if (sus == 'semestral') {
    plan = '90000'
  }
  if (sus == 'anual') {
    plan = '120000'
  }


  function buy() {
    axios.defaults.headers.post['Authorization'] = sessionStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
    let timerInterval
    Swal.fire({
        title: 'redirigiendo a place to pay ',
        html: `redirigiendo a place to pay en <b></b> milliseconds.
        <img src='https://dd7fpor0dpuv7.cloudfront.net/7bcd6ef2-f898-4570-b619-8d789617a930/assets/images/no_logo.svg' class='logo'/>
        `,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((e) => {
        axios.post('https://apidev.tools.antpack.co/thebeautyclub/api/payment/', { subscription: sessionStorage.getItem('subscription')}).then((res) => {
          console.log(res)
          // window.open(res.data.message.processUrl)
          sessionStorage.setItem('processUrl', res.data.message.processUrl)
          setiframe(true)
        })
      })
}
  
  return (
    <div className="App">
      <header className="header">
        <img width="100px" src={logo}></img>
      </header>
      <main>
        {
          !iframe
          ?
          <>

          <div className="carrito">
            <img width="25px" src={shopping}/>
            <div>
              <h4>Carrito de compras</h4>
              <h6>Tienes un item en tu carrito</h6>
            </div>
          </div>
          <div className="item">
              <img src={image}/>
              <span>Kit 2 -Lorem ipsum <br/> 6 productos / mes</span>
              <img/>
          </div>

          <div className="compra">
            <a href="https://www.placetopay.com/web/">
              <img style={{margin: '30px'}} width="200px" src='https://dd7fpor0dpuv7.cloudfront.net/7bcd6ef2-f898-4570-b619-8d789617a930/assets/images/no_logo.svg'></img>
            </a>
            <hr/>
            <div >
              <div className="info">
                <span>Kit 2- Lorem ipsum</span>
                <span>$200.000</span>
              </div>
              <div className="info">
                <span>Total</span>
                <span>$200.000</span>
              </div>
            </div>
              <button onClick={buy}>Ir a pagar $200.000</button>
          </div>
          </>
          : null
        }

      {
        iframe
        ?
        <div>          
          <iframe style={{marginLeft: '80px', marginTop: '20px', border: 'none'}} src={sessionStorage.getItem('processUrl')} height="600" width="90%" name="demo">
            {/* <p>Su navegador no es compatible con iframes</p> */}
          </iframe> 
        </div>
        : null
      }


        <Accordion style={{backgroundColor: '#4F4F4F', color: "white", width: '60%'}}>
        <AccordionSummary 
          
          //expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h4>PREGUNTAS FRECUENTES SOBRE PAGOS ELECTRÓNICOS</h4>
        </AccordionSummary>
        <AccordionDetails>

        <div>
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>¿Qué es Placetopay? </h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Placetopay es la plataforma de pagos electrónicos que usa (INCLUIR NOMBRE DEL COMERCIO) para procesar en línea las transacciones generadas en la tienda virtual con las formas de pago habilitadas para tal fin.  </p>
            </AccordionDetails>
          </Accordion>
            
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>¿Cómo puedo pagar? </h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>En la tienda virtual de (INCLUIR NOMBRE DEL COMERCIO) usted podrá realizar su pago con los medios habilitados para tal fin. Usted, de acuerdo a las opciones de pago escogidas por el comercio, podrá pagar a través de tarjetas de crédito Visa, American Express, Diners y MasterCard y Cuentas debito ahorro y corriente PSE.</p>
            </AccordionDetails>
          </Accordion>
            
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>¿Es seguro ingresar mis datos bancarios en este sitio web? </h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Para proteger tus datos (INCLUIR NOMBRE DEL COMERCIO) delega en Placetopay la captura de la información sensible. Nuestra plataforma de pagos cumple con los más altos estándares exigidos por la norma internacional PCI DSS de seguridad en transacciones con tarjeta de crédito. Además tiene certificado de seguridad SSL expedido por GeoTrust una compañía Verisign, el cual garantiza comunicaciones seguras mediante la encriptación de todos los datos hacia y desde el sitio; de esta manera te podrás sentir seguro a la hora de ingresar la información de su tarjeta. Durante el proceso de pago, en el navegador se muestra el nombre de la organización autenticada, la autoridad que lo certifica y la barra de dirección cambia a color verde. Estas características son visibles de inmediato y dan garantía y confianza para completar la transacción en Placetopay.</p>
            </AccordionDetails>
          </Accordion>
            
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>¿Puedo realizar el pago cualquier día y a cualquier hora? </h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Sí, en (INCLUIR NOMBRE DEL COMERCIO) podrás realizar tus compras en línea los 7 días de la semana, las 24 horas del día a sólo un clic de distancia. </p>
            </AccordionDetails>
          </Accordion>
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>¿Puedo cambiar la forma de pago?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Si aún no has finalizado tu pago, podrás volver al paso inicial y elegir la forma de pago que prefieras. Una vez finalizada la compra no es posible cambiar la forma de pago. 

              ESTABLECIMIENTO DE COMERCIO: el punto anterior aplica a la forma de pago, pero deberán mencionar las políticas de devolución que tenga la tienda para dar cumplimiento al artículo 51 de la Ley del Estatuto del Consumidor.
              </p>
            </AccordionDetails>
          </Accordion>
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>¿Pagar electrónicamente tiene algún valor para mí como comprador?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>No, los pagos electrónicos realizados a través de Placetopay no generan costos adicionales para el comprador. 
              </p>
            </AccordionDetails>
          </Accordion>
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>¿Qué debo hacer si mi transacción no concluyó?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>En primera instancia, revisar si llegó un email de confirmación de la transacción a la cuenta de correo electrónico inscrita en el momento de realizar el pago, en caso de no haberlo recibido, deberás contactar a (PERSONA RESPONSABLE AL INTERIOR DEL COMERCIO) para confirmar el estado de la transacción. 
              </p>
            </AccordionDetails>
          </Accordion>
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>¿Qué debo hacer si no recibí el comprobante de pago?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Por cada transacción aprobada a través de Placetopay, recibirás un comprobante del pago con la referencia de compra en la dirección de correo electrónico que indicaste al momento de pagar. 

Si no lo recibes, podrás contactar a (PERSONA RESPONSABLE AL INTERIOR DEL COMERCIO) o a la línea (teléfono del comercio) o al correo electrónico comercio@comercio.com, para solicitar el reenvío del comprobante a la misma dirección de correo electrónico registrada al momento de pagar. </p>
            </AccordionDetails>
          </Accordion>
          
            </div>
         </AccordionDetails>
       </Accordion>
      </main>
    </div>
  );
}

export default App;