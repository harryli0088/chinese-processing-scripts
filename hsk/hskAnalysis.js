const dictionary = require("../chineseOutput.json")
const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}



// [
//   "./hsk1-vocab.txt",
//   "./hsk2-vocab.txt",
//   "./hsk3-vocab.txt",
//   "./hsk4-vocab.txt",
//   "./hsk5-vocab.txt",
//   "./hsk6-vocab.txt",
// ].forEach(fileName => {
//   readModuleFile(fileName, function (err, hsk) {
//     countVocabInDictionary(hsk, fileName)
//   });
// })


function countVocabInDictionary(hsk, fileName) {
  let count = 0
  const hskSplit = hsk.split("\n")
  hskSplit.forEach(line => {
    const lineSplit = line.trim().split(" ")
    if(lineSplit.length > 0) {
      if(typeof dictionary.map[ lineSplit[1] ] === "number") {
        count++
      }
      // else {
      //   console.log("second split wasn't a number", line.trim())
      // }
    }
  })

  const total = hskSplit.length-1

  console.log(fileName, "count", count, total, count/total)
}


[
  "./hsk1-characters.txt",
  "./hsk2-characters.txt",
  "./hsk3-characters.txt",
  "./hsk4-characters.txt",
  "./hsk5-characters.txt",
  "./hsk6-characters.txt",
].forEach(fileName => {
  readModuleFile(fileName, function (err, hsk) {
    countCharactersInDictionary(hsk, fileName)
  });
})


function countCharactersInDictionary(hsk, fileName) {
  let count = 0
  const hskSplit = hsk.split(" ")
  hskSplit.forEach(str => {
    const character = str.trim()
    if(character.length === 1) {
      if(typeof dictionary.map[ character ] === "number") {
        count++
      }
    }
    else if(character.length > 0) {
      console.log("This string had more than on character", character)
    }
  })

  const total = hskSplit.length

  console.log(fileName, "count", count, total, count/total)
}
