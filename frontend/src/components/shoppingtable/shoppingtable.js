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
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setReduxItems } from '../../reducers/itemsReducer';

export default function ShoppingListTable() {
  const [items, setItems] = React.useState([]);
  const dispatch = useDispatch();
  const reduxItems = useSelector(state => state.items.items);
  
  useEffect(() => {
    axios.get('http://localhost:5000/items?email=testuser@gmail.com')
      .then(res => {
        setItems(res.data.items);
        dispatch(setReduxItems(res.data.items));
      })
  }, [])
  
  const handleDelete = (e) => {
    e.preventDefault();
    
    let id = e.target.id;

    var config = {
      method: 'delete',
      url: `http://localhost:5000/items/${id}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });


    axios.delete(`http://localhost:5000/items/${id}`).then(res => {
      axios.get('http://localhost:5000/items?email=testuser@gmail.com')
      .then(res => {
        setItems(res.data.items);
        dispatch(setReduxItems(res.data.items));
      })
    })
  }

  return (
    <div>
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
            {reduxItems && reduxItems.map((item) => (
              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {<FoodModal />}
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.amountConsumed+ " " + item.units}</TableCell>
                <TableCell align="center">{item.carbonFootprintValue}</TableCell>
                <TableCell align="center"><Button id={item._id}  onClick={handleDelete} variant="contained" color="error" startIcon={<DeleteIcon />}>
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