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
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

let score = 0

for (let row of rows){
    let stack = []
    for (let char of row.split("")){
        if (legalChunks.hasOwnProperty(char)) stack.push(char)
        else {
            // closing element
            let lastChunk = stack.pop()

            let expectedClosingChunk = legalChunks[lastChunk]

            if (expectedClosingChunk !== char) {
                score += scoring[char]
                break
            }
        }
    }
}

console.log(score)