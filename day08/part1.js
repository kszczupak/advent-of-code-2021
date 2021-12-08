const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

const rows = rawData.split("\r\n")

let cnt = 0
const searchedValues = new Set([2, 4, 3, 7])

for (let row of rows){
    let [patterns, outputs] = row.split(" | ").map(x => x.split(" "))
    outputs.forEach(x => {
        if (searchedValues.has(x.length)) cnt++
    })
}

console.log(cnt)