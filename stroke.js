const fs = require('fs');
const chineseOutput = require("./chineseOutput.json")

const strokes = {}

Object.keys(chineseOutput.map).forEach(key => {
  if(key.length === 1) {
    try {
      const strokeData = require('hanzi-writer-data/'+key);
      strokes[key] = flipStrokeData(strokeData.strokes)
      console.log("success", key)
    }
    catch(err) {
      console.log("require err", err)
    }
  }
})

fs.writeFile(
  "./strokesOutput.json",
  JSON.stringify(strokes),
  function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);


function flipStrokeData(strokes) {
  strokes.forEach((d,i) => {
    const split = d.split(" ")
    mod = 0
    split.forEach((s,j) => {
      const parsed = parseInt(s)
      if(!isNaN(parsed)) {
        ++mod
        if(mod%2 === 0) {
          split[j] = (900 - parsed).toString()
        }
      }
    })

    strokes[i] = split.join(" ")
  })

  return strokes
}
