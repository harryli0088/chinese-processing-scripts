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



[
  "./hsk1-vocab.txt",
  "./hsk2-vocab.txt",
  "./hsk3-vocab.txt",
  "./hsk4-vocab.txt",
  "./hsk5-vocab.txt",
  "./hsk6-vocab.txt",
].forEach(fileName => {
  readModuleFile(fileName, function (err, hsk) {
    countInDictionary(hsk, fileName)
    // formatVocab(hsk, fileName)
  });
})


function countInDictionary(hsk, fileName) {
  let count = 0
  const hskSplit = hsk.split("\n")
  hskSplit.forEach(line => {
    if(typeof dictionary.map[ line.trim() ] === "number") {
      count++
    }
  })

  const total = hskSplit.length

  console.log(fileName, "count", count, total, count/total)
}

// function formatVocab(hsk, fileName) {
//   const format = hsk.trim().split("\n").map(line => line.trim().split(" ")[1]).join("\n")
//
//   console.log(fileName)
//   console.log(format)
//   fs.writeFile("."+fileName.slice(5), format, () => {});
// }


[
  "./hsk1-characters.txt",
  "./hsk2-characters.txt",
  "./hsk3-characters.txt",
  "./hsk4-characters.txt",
  "./hsk5-characters.txt",
  "./hsk6-characters.txt",
].forEach(fileName => {
  readModuleFile(fileName, function (err, hsk) {
    countInDictionary(hsk, fileName)
    // formatCharacters(hsk, fileName)
  });
})

// function formatCharacters(hsk, fileName) {
//   const format = hsk.trim().split(" ").map(char => char.trim()).join("\n")
//
//   console.log(fileName)
//   console.log(format)
//
//   fs.writeFile("."+fileName.slice(5), format, () => {});
// }
