import {Graph, astar} from '../algo/astar.js'
import {readFile} from '../utils.js'

let inputData = readFile()
const parsedMatrix = inputData.map(el => el.split('').map(Number))

function getResult(matrix) {
    const endX = matrix.length - 1
    const endY = matrix[0].length - 1
    const graph = new Graph(matrix)
    const start = graph.grid[0][0]
    const end = graph.grid[endX][endY]
    const result = astar.search(graph, start, end)
    let sum = 0

    result.forEach(node => {
        sum += node.weight
    })

    return sum
}

const add = (x, y) => x + y > 9 ? 1 : x + y

const getFirst = () => {
    return getResult(parsedMatrix)
}

const getSecond = () => {
    const steps = 5
    let bigMatrix = [...parsedMatrix]

    for (let x = 0; x < bigMatrix.length; x++) {
        let row = bigMatrix[x]

        for (let i = 1; i < steps; i++) {
            row = row.map(cell => add(cell, 1))
            bigMatrix[x] = bigMatrix[x].concat(row)
        }
    }

    let copy = bigMatrix.map(row => row.slice())

    for (let i = 1; i < steps; i++) {
        copy = copy.map(row => row.map(cell => add(cell, 1)))
        bigMatrix = bigMatrix.concat(copy)
    }

    return getResult(bigMatrix)
}


console.log('First:', getFirst())
console.log('Second:', getSecond())