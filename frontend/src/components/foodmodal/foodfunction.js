export const getAlternatives =  (myFood) => {
    var alternativesHM = [];
    const jsonData = require('./foodItemCarbonFootprint.json');
    let curFoodTypology
    let carbonFoodPrintTypology
    let carbonFootprintFoodItem
    for (let i = 0; i < jsonData.length; i++) {
        // console.log(jsonData[i]['FOOD_ITEM'], 'item')
        if (jsonData[i]['FOOD_ITEM'] == myFood) {
            curFoodTypology = jsonData[i].FOOD_TYPOLOGY;
            carbonFoodPrintTypology = jsonData[i].CARBON_FOOTPRINT_TYPOLOGY;
            carbonFootprintFoodItem = jsonData[i].CARBON_FOOTPRINT_FOOD_ITEM;
            break;
        }
    }

    for (let i = 0; i < jsonData.length; i++) {
        //console.log(jsonData[i].FOOD_TYPOLOGY);
        if (jsonData[i].FOOD_TYPOLOGY == curFoodTypology) {
            //if (jsonData[i].FOOD_TYPOLOGY == jsonData[food].FOOD_TYPOLOGY) {
            if (parseInt(jsonData[i]['CARBON_FOOTPRINT_FOOD_ITEM']) < parseInt(carbonFootprintFoodItem)) {
            // if (parseInt(jsonData[i]['CARBON_FOOTPRINT_FOOD_TYPOGRAPHY']) < parseInt(carbonFoodPrintTypology)) {
                alternativesHM.push(jsonData[i]);
                // console.log('zzz', alternativesHM)
            }
        }
    }

    return alternativesHM
}