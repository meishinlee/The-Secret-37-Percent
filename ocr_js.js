const { FoodDatabaseClient } = require('edamam-api');
const cv = require('opencv4nodejs');
const SpellChecker = require('simple-spellchecker');
const Tesseract = require('tesseract.js')
const fs = require('fs');
const path = require('path');
const imutils = require('imutils');
const { Point2, Point, imwrite } = require('opencv4nodejs');

var filePath="test1.jpg"
var directory=""
var language="en"

var files=[]

const edamamClient = new FoodDatabaseClient({
    appId: '8ab63521',
    appKey: '63b1bfa108af89681b61030fa9437f34'
});

if(directory.length > 0){
    fs.readdir(DIR, (err, files) => {
        files.forEach(file => {
            files.push(path.join(DIR,file))
        });
      });      
}
else{
    files.push(filePath)
}

for (let i=0; i < files.length; i++){
    console.log("Processing image", i, ": ", files[i])
    var orig = cv.imread(files[i]);
    image = orig.copy()
    image = image.resize(500, 500)
    ratio = orig.cols / image.cols

    height = image.rows
    width = image.cols

    fullContour = [new Point2(0,0), new Point2(width-1,0), new Point2(width-1,height-1), new Point2(0, height-1)]
    const color = new cv.Vec3(0, 255, 0);

    contourImage = image.copy()
    contourImage.drawContours([fullContour], -1, color, 2);
    imwrite("contouredImage.png", contourImage)
    
    
}



