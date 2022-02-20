export const getFoodFoodprint = (myFood) => {
    var alternativesHM = [];
    const jsonData= require('./foodItemCarbonFootprint.json'); 
    let curFoodTypology
    let carbonFoodPrintTypology
    for (let i = 0; i < jsonData.length; i++) {
      // console.log(jsonData[i]['FOOD_ITEM'], 'item')
        if (jsonData[i]['FOOD_ITEM'] == myFood) {
            curFoodTypology = jsonData[i].FOOD_TYPOLOGY;
            carbonFoodPrintTypology = jsonData[i].CARBON_FOOTPRINT_TYPOLOGY;
            break;
        }
    }
    console.log(curFoodTypology)

    for (let i = 0; i < jsonData.length; i++) {
      //console.log(jsonData[i].FOOD_TYPOLOGY);
      if (jsonData[i].FOOD_TYPOLOGY == curFoodTypology) {
      //if (jsonData[i].FOOD_TYPOLOGY == jsonData[food].FOOD_TYPOLOGY) {
        if (jsonData[i]['CARBON_FOOTPRINT_TYPOLOGY'] < carbonFoodPrintTypology) {
          alternativesHM.push(jsonData[i]['FOOD_ITEM']);
        }
      }
    }
    return alternativesHM
}