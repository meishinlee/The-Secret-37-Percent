// Sample images

    // https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg
    // https://raw.githubusercontent.com/Azure/azure-sdk-for-python/master/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png

//

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// import fs from 'fs';

// const cv = require("opencv4nodejs");

export async function recognizeReceipt(path="./contoso-allinone.jpg", debug=true) {
  
  const endpoint = "https://treehacks-sustainability.cognitiveservices.azure.com/";
  const apiKey = "deed38caa3bc46dbbbbbde0703b4847d";
  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));

  // const readStream = fs.createReadStream(path);

  // const poller = await client.beginRecognizeReceipts(readStream, {
  //   onProgress: (state) => {
  //     console.log(`status: ${state.status}`);
  //   }
  // });
    // https://raw.githubusercontent.com/Azure/azure-sdk-for-python/master/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png

  // let receiptUrl = "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/master/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"
  // let receiptUrl = "http://localhost:5000/public/image.png"
  let receiptUrl = "https://raw.githubusercontent.com/ashok-arjun/youtube/master/images/test3.jpg"

  // let receiptUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg"
  
  let poller = await client.beginRecognizeReceiptsFromUrl(receiptUrl, {
        onProgress: (state) => { console.log(`status: ${state.status}`); }
  });  

  const receipts = await poller.pollUntilDone();

  if (!receipts || receipts.length <= 0) {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  let receipt = receipts[0];
  let json_receipt = JSON.parse(JSON.stringify(receipt))

  let fields = json_receipt['fields']

  let date = fields['TransactionDate']
  let valueDate = date['value'] 

  let items = fields['Items']['value']
  console.log(items)

  let nameBoundingBoxes = []
  let names = []

  for(let i=0; i< items.length; i++){
      let item = items[i]['value']

      let name = item['Name']
      let nameText = name['value']
      let nameBoundingBox = name['valueData']['boundingBox']
      names.push(nameText)
      nameBoundingBoxes.push(nameBoundingBox)
  }


  // TODO: Display uploaded receipt image, and image with bounding boxes to show the user

  console.log("Date: ", valueDate)
  console.log("Items:")

  for(let i=0;i<names.length;i++){
      console.log(names[i])
  }

  return [names, nameBoundingBoxes]
}

recognizeReceipt().catch((err) => {
  console.error("The sample encountered an error:", err);
});