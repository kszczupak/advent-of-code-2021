const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")
const parsedData = rawData.split("\r\n");

let sumBits = Array(parsedData[0].length).fill(0);


parsedData.forEach(values => {
    values.split("").forEach((rawBit, idx) => {
        sumBits[idx] += parseInt(rawBit);
    })
})

const gammaRateBits = [];
const epsilonRateBits = [];

sumBits.forEach(sum => {
    gammaRateBits.push((sum > parsedData.length / 2) ? "1" : "0");
    epsilonRateBits.push((sum < parsedData.length / 2) ? "1" : "0");
})

const gammaRate = parseInt(gammaRateBits.join(""), 2)
const epsilonRate = parseInt(epsilonRateBits.join(""), 2)
console.log(gammaRate * epsilonRate)