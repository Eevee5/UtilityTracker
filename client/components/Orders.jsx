import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Title from './Title';

// Generate Bill Data,  date, name, amount
function createData(id, date, name,  amount) {
  return { id, date, name, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Water',
    312.44,
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Electricity',
    866.99,
    'London, UK',
    'VISA ⠀•••• 2574',
  ),
  createData(2, '16 Mar, 2019', 'Home alarm', 100.81, 'Boston, MA', 'MC ⠀•••• 1253',),
  createData(
    3,
    '16 Mar, 2019',
    'Gas',
    654.39,
    'Gary, IN',
    'AMEX ⠀•••• 2000',
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Trash/Recycle',
    212.79,
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {
  // const [bills, setBills] = useState([]);
  // console.log('userid test', props.token.userId);
  

  

  useEffect(() => {
    const endpoint = `/data/bills`;
  
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // setBills(data);
        props.set(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <React.Fragment>
      <title>Recent Bills</title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more bills
      </Link>
    </React.Fragment>
  );
}






















































































