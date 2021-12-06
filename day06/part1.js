const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

let lanternfishes = rawData.split(",").map(x => parseInt(x));

const days_limit = 80
let stateAfterOneDay = [...lanternfishes]

for (let day = 0; day < days_limit; day++) {
    for (let [fishIdx, fishAge] of lanternfishes.entries()) {
        if (fishAge <= 0) {
            stateAfterOneDay[fishIdx] = 6
            stateAfterOneDay.push(8)
        } else {
            stateAfterOneDay[fishIdx] -= 1
        }
    }
    lanternfishes = [...stateAfterOneDay]
}

console.log(lanternfishes.length)