const fs = require("fs")

const data = fs.readFileSync("./input.txt", "utf8")

let increased = 0;
let previousValue = null;

data.split("\n").forEach(value => {
    if (previousValue != null && (value - previousValue) > 0)  {
        increased++;
    }
    previousValue = value;
})

console.log(increased)