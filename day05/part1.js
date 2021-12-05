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

function horizontalPoints(startPoint, stopPoint) {
    const points = [startPoint]
    let newPoint = startPoint
    let dir
    if (startPoint.x < stopPoint.x) dir = 1
    else dir = -1

    do {
        newPoint = new Point(newPoint.x + dir, newPoint.y)
        points.push(newPoint)
    }
    while (!newPoint.isEqual(stopPoint));

    return points
}

function verticalPoints(startPoint, stopPoint) {
    const points = [startPoint]
    let newPoint = startPoint
    let dir
    if (startPoint.y < stopPoint.y) dir = 1
    else dir = -1

    do {
        newPoint = new Point(newPoint.x, newPoint.y + dir)
        points.push(newPoint)
    }
    while (!newPoint.isEqual(stopPoint));

    return points
}

const pointsCounter = new Map()

for (let row of rawData) {
    const [start, stop] = row.split("->").map(x => x.trim()).map(x => Point.fromRaw(x))
    let linePoints;
    if (start.y === stop.y) linePoints = horizontalPoints(start, stop)
    else if (start.x === stop.x) linePoints = verticalPoints(start, stop)
    else continue

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
