const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

let initialState = rawData.split(",").map(x => parseInt(x));

const days_limit = 256
const fishCount = {}
// initialize with 0
for (let i = 0; i < 9; i++) fishCount[i] = 0
// add initial values
for (let fishAge of initialState) fishCount[fishAge] += 1


for (let day = 0; day < days_limit; day++) {
    const newFishes = fishCount[0]
    fishCount[0] = fishCount[1]
    fishCount[1] = fishCount[2]
    fishCount[2] = fishCount[3]
    fishCount[3] = fishCount[4]
    fishCount[4] = fishCount[5]
    fishCount[5] = fishCount[6]
    fishCount[6] = fishCount[7] + newFishes
    fishCount[7] = fishCount[8]
    fishCount[8] = newFishes
}

sum = Object.values(fishCount).reduce((x, y) => x + y)
console.log(sum)