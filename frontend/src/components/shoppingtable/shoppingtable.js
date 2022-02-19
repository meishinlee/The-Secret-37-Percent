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
                <TableCell align="center">{item.amountConsumed+ " " + item.units}</TableCell>
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