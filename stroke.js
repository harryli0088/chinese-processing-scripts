const fs = require('fs');
const chineseOutput = require("./chineseOutput.json")

const strokes = {}
const yFlip = 900

Object.keys(chineseOutput.map).forEach(key => {
  if(key.length === 1) {
    try {
      const strokeData = require('hanzi-writer-data/'+key);
      strokeData.strokes = flipStrokeData(strokeData.strokes)
      strokeData.medians.forEach(s => {
        s.forEach(dots => {
          dots[1] = yFlip - dots[1]
        })
      })
      strokes[key] = strokeData
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
          split[j] = (yFlip - parsed).toString()
        }
      }
    })

    strokes[i] = split.join(" ")
  })

  return strokes
}
