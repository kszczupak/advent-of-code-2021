const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

const rows = rawData.split("\r\n")
const board = new Set()
const instructions = []

for (let row of rows) {
    if (row === "") continue
    if (row.startsWith("fold along")) {
        let rawInstruction = row.replace("fold along ", "")
        let instruction = rawInstruction.split("=")
        instruction = [instruction[0], parseInt(instruction[1])]
        instructions.push(instruction)
    } else {
        // row contains actual position
        board.add(row)
    }
}

function foldHorizontal(oldBoard, yFold){
    const newBoard = new Set()

    for (let position of oldBoard){
        const [x, y] = position.split(",").map(val => parseInt(val))
        if (y === yFold) continue
        if (y < yFold) newBoard.add(position)
        else {
            let newY = 2 * yFold - y
            let newPosition = [x, newY].join(",")
            newBoard.add(newPosition)
        }
    }

    return newBoard
}

function foldVertical(oldBoard, xFold){
    const newBoard = new Set()

    for (let position of oldBoard){
        const [x, y] = position.split(",").map(val => parseInt(val))
        if (x === xFold) continue
        if (x < xFold) newBoard.add(position)
        else {
            let newX = 2 * xFold - x
            let newPosition = [newX, y].join(",")
            newBoard.add(newPosition)
        }
    }

    return newBoard
}

function simulateFolds(board, instructions){
    let foldBoard = board
    for (let instruction of instructions){
        const [dir, fold] = instruction
        if (dir === "x")  foldBoard = foldVertical(foldBoard, fold)
        else foldBoard = foldHorizontal(foldBoard, fold)
    }
    return foldBoard
}

let firstInstruction = instructions.slice(0, 1)
let boardAfterFirstInstruction = simulateFolds(board, firstInstruction)

console.log(boardAfterFirstInstruction.size)