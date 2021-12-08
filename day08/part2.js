const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

const rows = rawData.split("\r\n")

function searchConnections(connectionPatterns) {
    const byLength = {}
    for (let pattern of connectionPatterns) {
        if (!byLength.hasOwnProperty(pattern.length)) byLength[pattern.length] = []
        byLength[pattern.length].push(pattern)
    }

    const knownNumbers = {}
    knownNumbers["1"] = byLength[2].pop()
    knownNumbers["4"] = byLength[4].pop()
    knownNumbers["7"] = byLength[3].pop()
    knownNumbers["8"] = byLength[7].pop()

    let [num9, rem6] = getContaining(byLength[6], knownNumbers["4"])
    knownNumbers["9"] = num9
    byLength[6] = rem6

    let [num0, rem6_2] = getContaining(byLength[6], knownNumbers["1"])
    knownNumbers["0"] = num0
    knownNumbers["6"] = rem6_2.pop()

    let [num3, rem5] = getContaining(byLength[5], knownNumbers["7"])
    knownNumbers["3"] = num3
    byLength[5] = rem5

    const diff = getNumberOfDifferentElements(knownNumbers["6"], rem5[0])
    if (diff === 1) {
        knownNumbers["5"] = rem5[0]
        knownNumbers["2"] = rem5[1]
    } else {
        knownNumbers["5"] = rem5[1]
        knownNumbers["2"] = rem5[0]
    }

    const sortedNumbers = {}

    for (const [key, value] of Object.entries(knownNumbers)) {
        sortedNumbers[sorted(value)] = key
    }
    return sortedNumbers
}

function contains(fullWord, subset) {
    const word = new Set(fullWord)
    for (let char of subset) {
        if (!word.has(char)) return false
    }
    return true
}

function getContaining(possibilities, containWhat) {
    const remaining = []
    let solution
    for (let conn of possibilities) {
        if (contains(conn, containWhat)) solution = conn
        else remaining.push(conn)
    }
    return [solution, remaining]
}

function getNumberOfDifferentElements(biggerElement, smallerElement) {
    let cnt = 0
    const smaller = new Set(smallerElement)
    for (let char of biggerElement) if (!smaller.has(char)) cnt += 1
    return cnt
}

function sorted(string) {
    return string.split("").sort().join("")
}

let sum = 0

for (let row of rows) {
    let [patterns, outputs] = row.split(" | ").map(x => x.split(" "))
    let connections = searchConnections(patterns)
    let rawOutput = outputs.map(x => connections[sorted(x)]).join("")

    sum += parseInt(rawOutput)
}

console.log(sum)