import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ShoppingListTable from '../components/shoppingtable/shoppingtable';
import Autocomplete from '@mui/material/Autocomplete';
import { setReduxItems } from '../reducers/itemsReducer';

const Home = () => {

    const [displayGreen, setDisplayGreen] = useState(false);
    const [name, setName] = React.useState('');
    const [amountConsumed, setAmountConsumed] = React.useState('');
    const [units, setUnits] = React.useState('');
    const [myOptions, setMyOptions] = useState([]);

    const dispatch = useDispatch();

    const handleOnClick = e => {
        e.preventDefault();
    }

    const jsonData = require('./../foodItemCarbonFootprint.json');
    // console.log("dewrewr",jsonData);
    var carbonDataHM = {};
    var carbonData = []; 
    for (let i = 0; i < jsonData.length; i++) {
        // console.log("dewrewr",jsonData[i]);
        carbonData.push(jsonData[i]['FOOD_ITEM']); 
        carbonDataHM[jsonData[i]['FOOD_ITEM']] = jsonData[i]['CARBON_FOOTPRINT_FOOD_ITEM'];
        // .push((jsonData[i]['FOOD_ITEM'], jsonData[i]['CARBON_FOOTPRINT']));
    }

    const defaultProps = {
        options: carbonData,
        getOptionLabel: (option) => option,
    };

    const handleChange = (event) => {
        setUnits(event.target.value);
    };

    const addToDb = (e) => {
        let intAmountConsumed = parseInt(amountConsumed);
        // console.log("dewrewr",carbonDataHM);
        let carbonFootprint = carbonDataHM[name] * amountConsumed / 1000; 
        // console.log("dewrewr",carbonFootprint);
        var data = JSON.stringify({
            "email": "testuser@gmail.com",
            "name": name,
            "amountConsumed": intAmountConsumed,
            "units": units,
            "carbonFootprintValue": carbonFootprint
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/items',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                axios.get('http://localhost:5000/items?email=testuser@gmail.com')
                    .then(res => {
                        dispatch(setReduxItems(res.data.items));
                    })
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const Input = styled('input')({
        display: 'none',
    });

    return (
        <div>
            <Box pt={0} ml={10} pl={3} pr={3} mr={10}>
                {/* <h1>Let's Improve Planet Health Together <span role="img" aria-label="plant">🌿</span></h1> */}
                <h2 >Tracking our carbon footprint a step at a time <span role="img" aria-label="footprint">👣</span></h2>

                <Stack direction="row" spacing={2} alignItems="center" pt={3}>
                    <Autocomplete
                        required
                        style={{ minWidth: 300 }}
                        {...defaultProps}
                        id="auto-complete"
                        autoComplete
                        includeInputInList
                        onClick={(e, value) => { setName(value) }}
                        onInputChange={(e, newInputValue) => { setName(newInputValue) }}
                        renderInput={(params) => (
                            <TextField {...params} label="Enter a food" variant="standard" />
                        )}
                    />
                    {/* <TextField onChange={e => { setName(e.target.value) }} fullWidth id="food" label="Enter a food" variant="outlined" /> */}
                    <TextField required onChange={e => { setAmountConsumed(e.target.value) }} fullWidth id="amount-food" label="Amount of Food Consumed" variant="outlined" />
                    <FormControl fullwidth variant="standard" style={{ minWidth: 120 }}>
                        <InputLabel required fullwidth id="select-units">Units</InputLabel>
                        <Select fullwidth labelId="select-units"
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
                        <Button variant="contained" color="success" onClick={addToDb} onMouseLeave={() => setDisplayGreen(true)}>Add!</Button>}
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" pt={3} pl={20}>
                    <h3>or... Upload a photo of your most recent receipt </h3>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" component="span">
                            Upload <IconButton sx={{ color: "white" }} aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </Button>
                    </label>
                </Stack>
            </Box>
            <Box mt={5} alignItems="center">
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    <h3>Shopping List <span role="img" aria-label="list">📃</span></h3>
                </Typography>
                <ShoppingListTable />

            </Box>

        </div>
    )
}

export default Home