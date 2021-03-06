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
          <h4>PREGUNTAS FRECUENTES SOBRE PAGOS ELECTR??NICOS</h4>
        </AccordionSummary>
        <AccordionDetails>

        <div>
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>??Qu?? es Placetopay? </h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Placetopay es la plataforma de pagos electr??nicos que usa (INCLUIR NOMBRE DEL COMERCIO) para procesar en l??nea las transacciones generadas en la tienda virtual con las formas de pago habilitadas para tal fin.  </p>
            </AccordionDetails>
          </Accordion>
            
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>??C??mo puedo pagar? </h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>En la tienda virtual de (INCLUIR NOMBRE DEL COMERCIO) usted podr?? realizar su pago con los medios habilitados para tal fin. Usted, de acuerdo a las opciones de pago escogidas por el comercio, podr?? pagar a trav??s de tarjetas de cr??dito Visa, American Express, Diners y MasterCard y Cuentas debito ahorro y corriente PSE.</p>
            </AccordionDetails>
          </Accordion>
            
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>??Es seguro ingresar mis datos bancarios en este sitio web? </h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Para proteger tus datos???(INCLUIR NOMBRE DEL COMERCIO) delega en Placetopay la captura de la informaci??n sensible. Nuestra plataforma de pagos cumple con los m??s altos est??ndares exigidos por la norma internacional PCI DSS de seguridad en transacciones con tarjeta de cr??dito. Adem??s tiene certificado de seguridad SSL expedido por GeoTrust una compa????a Verisign, el cual garantiza comunicaciones seguras mediante la encriptaci??n de todos los datos hacia y desde el sitio; de esta manera te podr??s sentir seguro a la hora de ingresar la informaci??n de su tarjeta. Durante el proceso de pago, en el navegador se muestra el nombre de la organizaci??n autenticada, la autoridad que lo certifica y la barra de direcci??n cambia a color verde. Estas caracter??sticas son visibles de inmediato y dan garant??a y confianza para completar la transacci??n en Placetopay.</p>
            </AccordionDetails>
          </Accordion>
            
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>??Puedo realizar el pago cualquier d??a y a cualquier hora? </h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>S??, en (INCLUIR NOMBRE DEL COMERCIO) podr??s realizar tus compras en l??nea los 7 d??as de la semana, las 24 horas del d??a a s??lo un clic de distancia. </p>
            </AccordionDetails>
          </Accordion>
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>??Puedo cambiar la forma de pago?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Si a??n no has finalizado tu pago, podr??s volver al paso inicial y elegir la forma de pago que prefieras. Una vez finalizada la compra no es posible cambiar la forma de pago. 

              ESTABLECIMIENTO DE COMERCIO: el punto anterior aplica a la forma de pago, pero deber??n mencionar las pol??ticas de devoluci??n que tenga la tienda para dar cumplimiento al art??culo 51 de la Ley del Estatuto del Consumidor.
              </p>
            </AccordionDetails>
          </Accordion>
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>??Pagar electr??nicamente tiene alg??n valor para m?? como comprador?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>No, los pagos electr??nicos realizados a trav??s de Placetopay no generan costos adicionales para el comprador. 
              </p>
            </AccordionDetails>
          </Accordion>
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>??Qu?? debo hacer si mi transacci??n no concluy???</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>En primera instancia, revisar si lleg?? un email de confirmaci??n de la transacci??n a la cuenta de correo electr??nico inscrita en el momento de realizar el pago, en caso de no haberlo recibido, deber??s contactar a (PERSONA RESPONSABLE AL INTERIOR DEL COMERCIO) para confirmar el estado de la transacci??n. 
              </p>
            </AccordionDetails>
          </Accordion>
            
            <Accordion>
            <AccordionSummary 
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <h4>??Qu?? debo hacer si no recib?? el comprobante de pago?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p>Por cada transacci??n aprobada a trav??s de Placetopay, recibir??s un comprobante del pago con la referencia de compra en la direcci??n de correo electr??nico que indicaste al momento de pagar. 

Si no lo recibes, podr??s contactar a (PERSONA RESPONSABLE AL INTERIOR DEL COMERCIO) o a la l??nea (tel??fono del comercio) o al correo electr??nico comercio@comercio.com, para solicitar el reenv??o del comprobante a la misma direcci??n de correo electr??nico registrada al momento de pagar. </p>
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