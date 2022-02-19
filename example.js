// // import Tesseract from 'tesseract.js';
 
// Tesseract = require('tesseract.js')

// Tesseract.recognize(
//   'https://tesseract.projectnaptha.com/img/eng_bw.png',
//   'eng',
//   { logger: m => console.log(m) }
// ).then(({ data: { text } }) => {
//   console.log(text);
// })

var SpellChecker = require('simple-spellchecker');

// result = SpellChecker.isMisspelled("ffsadfasfled")
// console.log(result)
SpellChecker.getDictionary("fr-FR", function(err, dictionary) {
  if(!err) {
      var misspelled = ! dictionary.spellCheck('maisonn');
      if(misspelled) {
          var suggestions = dictionary.getSuggestions('maisonn');
          console.log(suggestions)
      }
      else{
          console.log("Spelled correctly!")
      }
  }
});    