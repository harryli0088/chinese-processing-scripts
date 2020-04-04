const fs = require('fs');

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
      const traditional = charactersSplit[0]
      const simplified = charactersSplit[1]
      const pinyin = chinese[1].slice(0, chinese[1].length-1)

      const english = []
      for(let i=1; i<elements.length; ++i) {
        const trim = elements[i].trim()
        if(trim.length > 0) {
          english.push(trim)
        }
      }

      map[traditional] = parsed.length
      map[simplified] = parsed.length

      parsed.push({
        traditional,
        simplified,
        pinyin,
        english
      })
    }
  }

  console.log(parsed.slice(1000,2000))
});
