const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

let positions = rawData.split(",").map(x => parseInt(x));

function median(array){
    array.sort((x, y) => x - y)
    const half = Math.floor(array.length / 2)

    if (array.length % 2) return array[half]

    return (array[half - 1] + array[half]) / 2
}

const middlePosition = median(positions)

let fuel = 0

for (let position of positions) fuel += Math.abs(middlePosition - position)

console.log(fuel)