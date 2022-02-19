import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';



const Home = () => {
    return (
        <div>
            <Box mt={10}>
            <h1>Let's Improve Planet Health Together</h1>
            <h2>Tracking our carbon footprint a step at a time </h2>
            </Box>
            <Box ml={10} pl={3} pr = {3} mr = {10} pt = {10}>
            <Stack direction="row" spacing={2}>
                <TextField fullWidth id="outlined-basic" label="Enter a food" variant="outlined" />
                <Button variant="contained">Find Alternatives!</Button>
            </Stack>
            </Box>
        </div>
    )
}

export default Home