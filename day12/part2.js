const fs = require("fs")

const rawData = fs.readFileSync("./input.txt", "utf8")
// const rawData = fs.readFileSync("./example.txt", "utf8")


function buildGraph(data) {
    const rows = data.split("\r\n")
    const graph = new Map()

    for (let row of rows) {
        const [start, end] = row.split("-")
        if (!graph.has(start)) graph.set(start, [])
        if (!graph.has(end)) graph.set(end, [])

        graph.get(start).push(end)
        graph.get(end).push(start)
    }
    return graph
}

function getPossiblePaths(graph, start, end){
    const possiblePaths = []
    const queue = [[[start], false]]

    while (queue.length){
        const [path, doubleCave] = queue.pop()

        let lastElement = path.at(-1)

        if (lastElement === end){
            possiblePaths.push([...path])
            continue
        }

        for (let neighbour of graph.get(lastElement)){
            // add to visited only lowercase elements
            if (neighbour === start) continue

            if (neighbour === neighbour.toUpperCase() || !path.includes(neighbour)){
                queue.push([[...path, neighbour], doubleCave])
            }
            else if (!doubleCave && path.includes(neighbour)){
                queue.push([[...path, neighbour], true])
            }
        }
    }
    return possiblePaths

}

const g = buildGraph(rawData)
const paths = getPossiblePaths(g, "start", "end")
console.log(paths.length)
