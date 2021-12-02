const fs = require("fs")

const data = fs.readFileSync("./input.txt", "utf8")

let increased = 0;

const reducer = (accumulator, currentValue) => accumulator + currentValue

const dataElements = data.split("\r\n").map(x => parseInt(x));

for (let idx = 0; idx <= dataElements.length - 4; idx++) {
    const thisSum = dataElements.slice(idx, idx + 3).reduce(reducer)
    const nextSum = dataElements.slice(idx + 1, idx + 4).reduce(reducer)

    if (nextSum > thisSum) increased++
}

console.log(increased)