const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

const rows = rawData.split("\r\n")

const legalChunks = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
}

const scoring = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}

let scores = []

for (let row of rows){
    let stack = []
    let illegal = false
    for (let char of row.split("")){
        if (legalChunks.hasOwnProperty(char)) stack.push(char)
        else {
            // closing element
            let lastChunk = stack.pop()
            let expectedClosingChunk = legalChunks[lastChunk]
            if (expectedClosingChunk !== char) {
                illegal = true
                break
            }
        }
    }
    if (illegal) continue
    let score = 0
    while (stack.length > 0) {
        let chunk = stack.pop()
        let closingChunk = legalChunks[chunk]
        score *= 5
        score += scoring[closingChunk]
    }
    scores.push(score)
}

let sortedScores = scores.sort((a, b) => a - b)

console.log(sortedScores[Math.floor(scores.length / 2)])