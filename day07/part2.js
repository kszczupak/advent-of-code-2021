const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

let positions = rawData.split(",").map(x => parseInt(x));

function mean(array) {
    const sum = array.reduce((x, y) => x + y)
    return sum / array.length
}

function calculateFuel(array, optimalPosition) {
    let fuel = 0
    for (let position of array) {
        const distance = Math.abs(optimalPosition - position)
        fuel += distance * (distance + 1) / 2
    }
    return fuel
}

const meanPosition = mean(positions)

const possibleSolutions = [Math.ceil(meanPosition), Math.floor(meanPosition)].map(optimal => calculateFuel(positions, optimal))
const solution = Math.min(...possibleSolutions)

console.log(solution)