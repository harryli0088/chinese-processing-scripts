const Fuse = require('fuse.js')
const dictionary = require('./chineseOutput.json')

const options = {
  isCaseSensitive: false,
  findAllMatches: false,
  includeMatches: false,
  includeScore: false,
  useExtendedSearch: false,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.8,
  location: 0,
  distance: 50,
  keys: [
    "0","1","2","3","4"
  ],
};

const newFuse = new Fuse(dictionary.parsed, options)

console.log(dictionary.parsed[10002])

// const results = newFuse.search("testing")
// console.log("results",results.length)



dictionary.parsed.forEach(d => {

})
