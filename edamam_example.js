const { FoodDatabaseClient } = require('edamam-api');
 
(async () => {
 
    const client = new FoodDatabaseClient({
        appId: '8ab63521',
        appKey: '63b1bfa108af89681b61030fa9437f34'
      });
   
    const results = await client.search({ query: 'Chicken' });
    console.log(results)
      
})();