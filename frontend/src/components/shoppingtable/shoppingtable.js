import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import FoodModal from '../foodmodal/foodmodal';
import GetDataFromJSON from '../getdatafromjson/getdatafromjson';
import axios from 'axios'

// const data = GetDataFromJSON();
//console.log(data);
// const data = [
//     {
//         "email": "tsetuser@gmail.com",
//         "name": "Hamburger",
//         "amountConsumed": 1000,
//         "units": "grams",
//         "carbonFootprintValue": 0.5
//     },
//     {
//         "email": "tsetuser2@gmail.com",
//         "name": "Cheeseburger",
//         "amountConsumed": 2000,
//         "units": "grams",
//         "carbonFootprintValue": 1.5
//     },
//     {
//         "email": "tsetuser3@gmail.com",
//         "name": "Carrot",
//         "amountConsumed": 100,
//         "units": "grams",
//         "carbonFootprintValue": 0.2
//     }
// ]

// function createData(name, amountConsumed, carbonFootprintValue) {
//     return { name, amountConsumed, carbonFootprintValue};
// }

// const rows = []; 

// for(let i = 0; i < data.length; i++) {
//     var foodString = data[i].amountConsumed + " " + data[i].units; 
//     rows.push(createData(data[i].name, foodString, data[i].carbonFootprintValue));
// }
// console.log(rows);
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];

export default function ShoppingListTable() {
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/items?email=testuser@gmail.com')
      .then(res => {
        setItems(res.data.items);
      })
  }, [])

  return (
    <div>
      <GetDataFromJSON />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Find Alternative</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Amount Consumed</TableCell>
              <TableCell align="center">Carbon Footprint</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items && items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {<FoodModal />}
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.amountConsumed}</TableCell>
                <TableCell align="center">{item.carbonFootprintValue}</TableCell>
                <TableCell align="center"><Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}