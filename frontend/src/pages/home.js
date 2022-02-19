import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FoodModal from '../components/foodmodal/foodmodal';

const Home = () => {
    const [displayGreen, setDisplayGreen] = useState(false);
    const [units, setUnits] = React.useState('');
    const handleChange = (event) => {
        setUnits(event.target.value);
    };
    const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
    return (
        <div>
            <Box pt = {0} ml={10} pl={3} pr = {3} mr = {10}>
            {/* <h1>Let's Improve Planet Health Together <span role="img" aria-label="plant">🌿</span></h1> */}
            <h2 >Tracking our carbon footprint a step at a time <span role="img" aria-label="footprint">👣</span></h2>
            
            <Stack direction="row" spacing={2} alignItems="center" pt = {3}>
                <TextField fullWidth id="food" label="Enter a food" variant="outlined" />
                <TextField fullWidth id="amount-food" label="Amount of Food Consumed" variant="outlined" />  
                <FormControl fullwidth variant="standard" style={{minWidth: 120}}>
                <InputLabel fullwidth id="select-units">Units</InputLabel>
                <Select fullwdith labelId="select-units"
                    id="select-units"
                    value={units}
                    label="Units"
                    onChange={handleChange}>
                    <MenuItem value={'grams'}>grams (g)</MenuItem>
                    <MenuItem value={"ml"}>milliliters (mL)</MenuItem>
                </Select>
                </FormControl>
                {displayGreen ? 
                <Button variant="contained" color="primary" onMouseEnter={() => setDisplayGreen(false)}>Add!</Button> : 
                <Button variant="contained" color="success" onMouseLeave={() => setDisplayGreen(true)}>Add!</Button>}
            </Stack>
            </Box>

            <Box mt = {5} alignItems = "center">
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                <h3>Shopping List <span role="img" aria-label="list">📃</span></h3>
            </Typography>
            <List dense={dense} alignItems = 'center'>
              <Box spacing = {3} alignItems = "center">
                <ListItem alignItems = "center">
                    {/* <Avatar> */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <FoodModal />
                        <ListItemText
                            primary="INGREDIENT 1"
                            secondary={secondary ? 'Secondary text' : null}/>
                        <ListItemText>AMNT CONSUMED/UNITS</ListItemText>
                        <ListItemText>CARBON FOOTPRINT OF INGREDIENT</ListItemText>
                        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                  </Stack>
                    {/* <h5 ml = {10}><span role="img" aria-label="plant">🌿</span></h5> */}
                    {/* </Avatar> */}
                </ListItem>,
                </Box>
            </List>
            </Box>
            
        </div>
    )
}

export default Home