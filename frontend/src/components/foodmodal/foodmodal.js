import React from 'react'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import MenuBookIcon from '@mui/icons-material/MenuBook';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FoodModal = (food, footprint) => {
        const [alternatives, setAlternatives] = React.useState([]);
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        var alternativesHM = [];
        const jsonData= require('../../foodItemCarbonFootprint.json'); 
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i]['TYPOLOGY'] == jsonData[food]['TYPOLOGY']) {
            if (jsonData[i]['CARBON_FOOTPRINT_FOOD_ITEM'] < jsonData[food]['CARBON_FOOTPRINT_FOOD_ITEM']) {
              alternativesHM.push(jsonData[i]['FOOD_ITEM']);
            }
          }
        }

  return (
    <div>
        <Button variant="contained" color="success" onClick={handleOpen}> < MenuBookIcon/> &nbsp;Alternatives </Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Here are some alternatives for: #INSERT INGREDIENT HERE
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>
              <li>ITEM 1</li>
              <li>ITEM 2</li>
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default FoodModal