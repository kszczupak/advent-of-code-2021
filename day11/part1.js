const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

const rows = rawData.split("\r\n")
const board = new Map()

for (let [rowIdx, row] of rows.entries()) {
    for (let [colIdx, rawEnergyLevel] of row.split("").entries()) {
        let energyLevel = parseInt(rawEnergyLevel)
        let position = `${rowIdx} ${colIdx}`
        board.set(position, energyLevel)
    }
}

function* neighbours(position) {
    const [x, y] = position.split(" ").map(val => parseInt(val))
    for (let xOffset of [-1, 0, 1]) {
        for (let yOffset of [-1, 0, 1]) {
            if (xOffset === 0 && yOffset === 0) continue
            let neighbour = `${x + xOffset} ${y + yOffset}`
            if (board.has(neighbour)) yield neighbour
        }

    }
}

function simulateOneStep(initialBoard) {
    const updatedBoard = new Map()

    // 1. increase energy levels by one
    for (const [position, energyLevel] of initialBoard.entries()) updatedBoard.set(position, energyLevel + 1)

    const visited = new Set()
    const flashed = new Set()

    // 2. Check which elements are flashing
    for (let position of updatedBoard.keys()) {
        // if (visited.has(position)) continue
        visited.add(position)
        let energyLevel = updatedBoard.get(position)

        if (energyLevel > 9) flash(position, updatedBoard, visited, flashed)
    }

    // 3. Set energy lvl of flashed position to 0
    for (let position of flashed) updatedBoard.set(position, 0)


    return updatedBoard
}

let flashCnt = 0

function flash(position, board, visited, flashed) {
    flashCnt++
    flashed.add(position)
    for (let neighbour of neighbours(position)) {
        let updatedEnergyLevel = board.get(neighbour) + 1
        board.set(neighbour, updatedEnergyLevel)
        if (updatedEnergyLevel > 9 && visited.has(neighbour) && !flashed.has(neighbour)) flash(neighbour, board, visited, flashed)
    }
}

function printBoard(board){
    let line = []
    let rowIdx = "0"
    for (const [position, level] of board.entries()) {
        let currIdx = position.split(" ")[0]
        if (currIdx !== rowIdx){
            console.log(line.join(","))
            line = []
            rowIdx = currIdx
        }

        line.push(level)
    }
    console.log(line.join(","))
}

const stepsNbr = 100

let currentBoard = board

for (let step = 0; step < stepsNbr; step++) {
    console.log(`Step ${step}`)
    let newBoard = simulateOneStep(currentBoard)
    printBoard(currentBoard)
    console.log("------------------------")
    currentBoard = newBoard
}

console.log(flashCnt)