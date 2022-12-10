import {printMatrix, readFile} from '../../utils.js'

const inputData = readFile('test.txt')

const Commands = {
    noop: 'noop',
    addx: 'addx',
}
const rows = [...inputData]
const register = {
    X: 1,
}
let cycles = [20, 60, 100, 140, 180, 220]
const commandsQueue = []

let result = {}
let matrix = []
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 40; j++) {
        if (!matrix[i]) {
            matrix[i] = []
        }
        matrix[i][j] = 0
    }
}
for (let row of rows) {
    const [command, addX] = row.split(' ')
    if (command === Commands.noop) {
        commandsQueue.push(0)
    } else {
        commandsQueue.push(0, Number(addX))
    }
}

let commandIndex = 0

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
        let cycle = commandIndex + 1
        if (cycles.includes(cycle)) {
            result[cycle] = register.X * cycle
        }

        if ([register.X - 1, register.X, register.X + 1].includes(j)) {
            matrix[i][j] = 1
        }
        register.X += commandsQueue[commandIndex]
        commandIndex++
    }
}

console.log('First:', Object.values(result).reduce((acc, current) => acc + current, 0))
console.log('Second:')
printMatrix(matrix)
