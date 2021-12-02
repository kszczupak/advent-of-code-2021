const fs = require("fs")

const data = fs.readFileSync("./input.txt", "utf8")
// const data = fs.readFileSync("./example.txt", "utf8")

let horizontalPosition = 0
let verticalPosition = 0
let aim = 0

data.split("\n").forEach(values => {
    [dir, rawStep] = values.split(" ");
    const step = parseInt(rawStep);
    switch (dir){
        case "forward":
            horizontalPosition += step;
            verticalPosition += aim * step;
            break;
        case "down":
            aim += step;
            break;
        case "up":
            aim -= step;
            break;
        default:
            throw `Unknown dir: ${dir}`;
    }
})

console.log(horizontalPosition * verticalPosition)