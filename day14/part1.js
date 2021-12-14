const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")

function parseRawData(data) {
    const rows = rawData.split("\r\n")
    const template = rows[0]
    const rules = new Map()

    for (let rawRule of rows.slice(2)) {
        const [pair, element] = rawRule.split(" -> ")
        rules.set(pair, element)
    }
    return [template, rules]
}

function simulateOneStep(polymer, rules) {
    const newPolymer = []
    for (let i = 0; i < polymer.length - 1; i++) {
        newPolymer.push(polymer[i])
        let pair = polymer.slice(i, i + 2)
        if (rules.has(pair)) {
            let newElement = rules.get(pair)
            newPolymer.push(newElement)
        } else console.log(`Pair ${pair} not found in rules!`)
    }
    newPolymer.push(polymer.at(-1))
    return newPolymer.join("")
}

function counter(array) {
    const counts = {}
    for (const num of array) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts
}

function solution() {
    const [template, rules] = parseRawData(rawData)
    const stepsNbr = 10

    let polymer = template

    for (let i = 0; i < stepsNbr; i++) {
        polymer = simulateOneStep(polymer, rules)
    }

    const frequencies = Object.values(counter(polymer))

    return Math.max(...frequencies) - Math.min(...frequencies)
}

console.log(solution())