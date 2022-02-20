import React from 'react'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getFoodFoodprint } from './foodfunction';

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

const FoodModal = (props) => {
        const [alternatives, setAlternatives] = React.useState([]);
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        let alternativesHM = getFoodFoodprint('TOFU');

        // var alternativesHM = [];
        // const jsonData= require('./foodItemCarbonFootprint.json'); 

        // let myFood = 'TOFU'
        // let curFoodTypology
        // let carbonFoodPrintTypology
        // for (let i = 0; i < jsonData.length; i++) {
        //   // console.log(jsonData[i]['FOOD_ITEM'], 'item')
        //     if (jsonData[i]['FOOD_ITEM'] == myFood) {
        //         curFoodTypology = jsonData[i].FOOD_TYPOLOGY;
        //         carbonFoodPrintTypology = jsonData[i].CARBON_FOOTPRINT_TYPOLOGY;
        //         break;
        //     }
        // }
        // console.log(curFoodTypology)

        // for (let i = 0; i < jsonData.length; i++) {
        //   //console.log(jsonData[i].FOOD_TYPOLOGY);
        //   if (jsonData[i].FOOD_TYPOLOGY == curFoodTypology) {
        //   //if (jsonData[i].FOOD_TYPOLOGY == jsonData[food].FOOD_TYPOLOGY) {
        //     if (jsonData[i]['CARBON_FOOTPRINT_TYPOLOGY'] < carbonFoodPrintTypology) {
        //       alternativesHM.push(jsonData[i]['FOOD_ITEM']);
        //     }
        //   }
        // }

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
            {
              alternatives.map(alternative => {
                <li>alternative</li>
              })
            }
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