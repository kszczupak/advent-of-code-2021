const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8").split("\r\n");
// const rawData = fs.readFileSync("./example.txt", "utf8").split("\r\n");
const drawnNumbers = rawData[0].split(",").map(x => parseInt(x));

class BingoBoard {
    constructor(rawBoard) {
        this.size = rawBoard.length;
        this.allElements = [...Array(this.size * this.size)]
        this.rows = [...Array(this.size)].map(e => new Set())
        this.columns = [...Array(this.size)].map(e => new Set())
        this.bingo = false
        this.marked = new Set()


        this.#parseRawBoard(rawBoard)
    }

    mark(number) {
        this.rows.forEach(row => {
            row.delete(number)
            if (row.size === 0) this.bingo = true
        })

        this.columns.forEach(column => {
            column.delete(number)
            if (column.size === 0) this.bingo = true
        })

        this.marked.add(number)
    }

    score(number){
        let sum = 0
        this.allElements.forEach(element => {
            if (!this.marked.has(element)) sum += element
        })

        return number * sum
    }

    #parseRawBoard(rawBoard) {
        for (let [rowIdx, rawRow] of rawBoard.entries()) {
            let colIdx = 0
            for (let rawElement of rawRow.split(" ")) {
                if (rawElement === "") continue
                const element = parseInt(rawElement)

                this.columns[colIdx].add(element)
                this.rows[rowIdx].add(element)
                this.allElements[rowIdx * this.size + colIdx] = element
                colIdx++
            }
        }
    }
}

const boards = [];
let rawBoard = []

for (let row of rawData.slice(2)) {
    if (row === "") {
        const board = new BingoBoard(rawBoard)
        boards.push(board)
        rawBoard = []
        continue
    }
    rawBoard.push(row)
}

function simulateGame(boards, numbers) {
    let remainingBoards = [...boards]
    let lastWinningBoard = true
    for (let draw of numbers) {
        const newRemainingBoards = []
        for (let board of remainingBoards) {
            board.mark(draw)
            if (lastWinningBoard && lastWinningBoard.bingo) return [lastWinningBoard, draw]
            if (!board.bingo) newRemainingBoards.push(board)
        }
        if (newRemainingBoards.length === 1) lastWinningBoard = newRemainingBoards[0]
        remainingBoards = newRemainingBoards
    }
}

const [winningBoard, winingNumber] = simulateGame(boards, drawnNumbers)

console.log(winningBoard.score(winingNumber))
