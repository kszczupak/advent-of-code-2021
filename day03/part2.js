const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")
const parsedData = rawData.split("\r\n");

const numberLength = parsedData[0].length;

function getSumBit(allBits, idx) {
    let sumBits = Array(parsedData[0].length).fill(0);

    allBits.forEach(values => {
        values.split("").forEach((rawBit, j) => {
            sumBits[j] += parseInt(rawBit);
        })
    })

    return sumBits[idx]
}


function findRating(condition) {
    let candidates = [...parsedData]

    for (let idx = 0; idx < numberLength; idx++) {
        const sumBit = getSumBit(candidates, idx)
        const searchBit = condition(sumBit, candidates.length) ? "1" : "0"

        let newCandidates = [];
        for (let candidate of candidates) {
            if (candidate[idx] === searchBit) newCandidates.push(candidate);
        }
        if (newCandidates.length === 1) return newCandidates[0];

        candidates = newCandidates;
    }
}

const oxygenRating = parseInt(findRating((x, y) => x >= y / 2), 2)
const co2Rating = parseInt(findRating((x, y) => x < y / 2), 2)

console.log(oxygenRating * co2Rating)