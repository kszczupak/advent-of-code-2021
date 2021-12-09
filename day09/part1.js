const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

const rows = rawData.split("\r\n")
const board = new Map()

for (let [rowIdx, row] of rows.entries()) {
    for (let [colIdx, rawHeight] of row.split("").entries()) {
        let height = parseInt(rawHeight)
        let position = `${rowIdx} ${colIdx}`
        board.set(position, height)
    }
}

function* neighbours(position) {
    const [x, y] = position.split(" ").map(x => parseInt(x))
    yield `${x - 1} ${y}`
    yield `${x} ${y - 1}`
    yield `${x + 1} ${y}`
    yield `${x} ${y + 1}`
}

function isLocalMinimum(position) {
    const height = board.get(position)
    for (let neighbour of neighbours(position)) {
        if (!board.has(neighbour)) continue
        let neighbourHeight = board.get(neighbour)
        if (neighbourHeight <= height) return false
    }
    return true
}

const riskLevels = []

for (let position of board.keys()) {
    if (isLocalMinimum(position)) riskLevels.push(board.get(position) + 1)
}


console.log(riskLevels.reduce((x, y) => x + y))