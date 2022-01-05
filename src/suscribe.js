
import  React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4F4F4F',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(fecha, referencia, automatizacion, estado, valor) {
  return { fecha, referencia, automatizacion, estado, valor };
}


export default function CustomizedTables() {

  const [list, setList] = useState([]);
  const [sus, setSus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.post['Authorization'] = sessionStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
        const response = await axios({
          url: "https://apidev.tools.antpack.co/thebeautyclub/api/payment/",
        });

        setList(response.data.transactions);
        console.log(response.data.transactions)
      } catch (error) {
        console.log(error);
      }
    };

    const activeSubscription = async () => {
      try {
        axios.defaults.headers.post['Authorization'] = sessionStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
        const response = await axios({
          url: "https://apidev.tools.antpack.co/thebeautyclub/api/payment/activeSubscription",
        });

        sessionStorage.setItem('subscriptionId', response.data.id)
        setSus(response.data.subscription)
        console.log(response.data)
      } catch (error) {
        setSus(false)
      }
    };
    activeSubscription()
    fetchData();
  }, [setList, setSus]);
  
  
  
  const cancelSus = async () => {
    try {
      axios.defaults.headers.post['Authorization'] = sessionStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      const response = await axios.post('https://apidev.tools.antpack.co/thebeautyclub/api/payment/cancel', {
        "subscriptionId": sessionStorage.getItem('subscriptionId')
      }).then((res)=> {
        console.log(res.data.message)
        Swal.fire({
          icon: 'success',
          text: res.data.message,
        }).then(() => {
          setSus(false)
        })
      }
      )

      sessionStorage.setItem('subscriptionId', response.data.subscription.id)
      setSus(response.data.subscription)
      // console.log(response.data.subscription)
      console.log(sessionStorage.getItem('subscriptionId'))
    } catch (err) {
      console.log(err)
    }
  }



  return (
      <div style={{backgroundColor: '#E0E0E0', height: '100vh', paddingTop: '60px'}}>

            <div className='card'>
              {
                sus
                ?
                <>
                  <h3>actualmente cuentas con</h3>

                  <div style={{margin: 'auto', color: '#4F4F4F', textAlign: 'center', backgroundColor: '#E0E0E0', padding: '20px', borderRadius: '5px'}}>
                    <h3> {sus.name}</h3>
                    <h3> {sus.description}</h3>
                  </div>
                    <button onClick={cancelSus} style={{padding: '10px 30px', margin: '10px'}}>Cancel suscription</button>
                </>
                :
                <h3>actualmente no cuentas con una suscription</h3>
              }
            </div>
        <div className="table">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Fecha</StyledTableCell>
                    <StyledTableCell align="center">Referencia</StyledTableCell>
                    <StyledTableCell align="center">Automatizacion/Cus</StyledTableCell>
                    <StyledTableCell align="center">Estado</StyledTableCell>
                    <StyledTableCell align="center">Valor</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {
                    list.map((row) => (
                        <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            {row.updatedAt}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.referencePayment}</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">{row.status}</StyledTableCell>
                        <StyledTableCell align="center">{row.total}</StyledTableCell>
                        </StyledTableRow>
                    ))
                    
                  }
                </TableBody>
            </Table>
            </TableContainer>
                  {/* <button onClick={() => setActive(true)}>Clic</button> */}
          </div>
    </div>
  );
}


