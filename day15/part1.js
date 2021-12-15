const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")

// const rawData = fs.readFileSync("./example.txt", "utf8")


function buildGraph(data) {
    const rows = data.split("\r\n")
    const graph = new Map()

    for (let [rowIdx, row] of rows.entries()) {
        for (let [colIdx, rawEnergyLevel] of row.split("").entries()) {
            let weight = parseInt(rawEnergyLevel)
            let position = `${rowIdx} ${colIdx}`
            graph.set(position, weight)
        }
    }
    return graph
}

function* neighbours(position, graph) {
    const [x, y] = position.split(" ").map(val => parseInt(val))
    for (let xOffset of [-1, 0, 1]) {
        for (let yOffset of [-1, 0, 1]) {
            if (Math.abs(xOffset) === Math.abs(yOffset)) continue
            let neighbour = `${x + xOffset} ${y + yOffset}`
            if (graph.has(neighbour)) yield neighbour
        }
    }
}


class QueueElement {
    constructor(element, priority) {
        this.element = element
        this.priority = priority
    }

}


class PriorityQueue {
    constructor() {
        this.elements = []
    }

    enqueue(item, priority) {
        let queueElement = new QueueElement(item, priority)

        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].priority > queueElement.priority) {
                this.elements.splice(i, 0, queueElement)
                return
            }
        }

        this.elements.push(queueElement)
    }

    dequeue() {
        if (this.isEmpty()) throw Error("Empty queue")

        return this.elements.shift()
    }

    isEmpty() {
        return this.elements.length <= 0
    }
}

function dijkstra(graph, startPosition) {
    const distanceTo = new Map()
    for (let position of graph.keys()) distanceTo.set(position, Number.POSITIVE_INFINITY)
    distanceTo.set(startPosition, 0)

    const priorityQueue = new PriorityQueue()
    priorityQueue.enqueue(startPosition, 0)

    const visited = new Set()

    while (!priorityQueue.isEmpty()) {
        let queueElement = priorityQueue.dequeue()
        let position = queueElement.element

        visited.add(position)

        for (let neighbour of neighbours(position, graph)) {
            if (!visited.has(neighbour)) {
                let oldCost = distanceTo.get(neighbour)
                let newCost = distanceTo.get(position) + graph.get(neighbour)
                if (newCost < oldCost) {
                    priorityQueue.enqueue(neighbour, newCost)
                    distanceTo.set(neighbour, newCost)
                }
            }
        }
    }
    return distanceTo
}

function solution() {
    const graph = buildGraph(rawData)
    const distanceMap = dijkstra(graph, "0 0")

    const graphDimension = Math.sqrt(graph.size)
    const endPosition = `${graphDimension - 1} ${graphDimension - 1}`

    return distanceMap.get(endPosition)
}

console.log(solution())