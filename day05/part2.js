const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8").split("\r\n");

// const rawData = fs.readFileSync("./example.txt", "utf8").split("\r\n");

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static fromRaw(rawString) {
        const [x, y] = rawString.split(",").map(x => parseInt(x))
        return new Point(x, y)
    }

    toString() {
        return `Point(x=${this.x}, y=${this.y})`
    }

    isEqual(other) {
        if (!(other instanceof Point)) return false
        return this.x === other.x && this.y === other.y
    }
}

function getLinePoints(startPoint, stopPoint) {
    const points = [startPoint]
    let newPoint = startPoint
    let xDir, yDir

    if (startPoint.y < stopPoint.y) yDir = 1
    else if (startPoint.y > stopPoint.y) yDir = -1
    else yDir = 0

    if (startPoint.x < stopPoint.x) xDir = 1
    else if (startPoint.x > stopPoint.x) xDir = -1
    else xDir = 0

    do {
        newPoint = new Point(newPoint.x + xDir, newPoint.y + yDir)
        points.push(newPoint)
    }
    while (!newPoint.isEqual(stopPoint));

    return points
}


const pointsCounter = new Map()

for (let row of rawData) {
    const [start, stop] = row.split("->").map(x => x.trim()).map(x => Point.fromRaw(x))
    const linePoints = getLinePoints(start, stop)

    linePoints.forEach(point => {
        const key = point.toString()
        if (pointsCounter.has(key)) {
            const oldCnt = pointsCounter.get(key)
            pointsCounter.set(key, oldCnt + 1)
        } else pointsCounter.set(key, 1)
    })
}

let cnt = 0

pointsCounter.forEach(value => {
    if (value >= 2) cnt++
})

console.log(cnt)
