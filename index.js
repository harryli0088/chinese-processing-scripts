const fs = require('fs');
const toneConvert = require('pinyin-tone-convert')

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

const map = {}
const parsed = []
readModuleFile('./cedict_ts.u8', function (err, file) {
  const lines = file.split("\n")
  const length = lines.length
  for(let i=0; i<length; ++i) {
    const elements = lines[i].trim().split("/")

    if(elements.length > 1) {
      const chinese = elements[0].trim().split("[")
      const charactersSplit = chinese[0].trim().split(" ")
      const traditional = charactersSplit[0].trim()
      const simplified = charactersSplit[1].trim()
      const pinyin = chinese[1].slice(0, chinese[1].length-1).trim()

      const pinyinSplit = pinyin.split(" ")
      pinyinSplit.forEach((p,i) => {
        try {
          pinyinSplit[i] = toneConvert(p) //try to convert the number pinyin to tone
        }
        catch(err) {
          console.log(err, p)
        }
      })

      const tonePinyin = pinyinSplit.join(" ")


      const english = []
      for(let i=1; i<elements.length; ++i) {
        const trim = elements[i].trim()
        if(trim.length > 0) {
          english.push(trim)
        }
      }

      if(map[traditional] === undefined) {
        map[traditional] = []
      }
      map[traditional].push(parsed.length)

      //if the traditional and simplified characters are different
      if(traditional !== simplified) {
        if(map[simplified] === undefined) {
          map[simplified] = []
        }
        map[simplified].push(parsed.length)
      }

      parsed.push([traditional, simplified, pinyin, tonePinyin, english])
    }
  }

  // console.log(parsed.slice(1000,2000))
  // const loveIndex = map['爱']
  // console.log(loveIndex)
  // console.log(parsed[loveIndex])

  fs.writeFile(
    "./chineseOutput.json",
    JSON.stringify({
      parsed,
      map,
    }),
    function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
});
