import {generateMatrixByMaxValue, readFile} from '../utils.js'

const inputData = readFile()

const printMatrix = (matrix) => {
    let printableMatrix = [...matrix]
    for (let i = 0; i < printableMatrix.length; i++) {
        for (let j = 0; j < printableMatrix[i].length; j++) {
            printableMatrix[i][j] = printableMatrix[i][j] ? '#' : '.'
        }
        printableMatrix[i] = printableMatrix[i].join(' ')
    }

    console.log(printableMatrix.join('\n'))
}

const getResult = () => {
    let rows = []
    let instructions = []
    let maxY = -1
    let maxX = -1

    inputData.forEach(row => {
        if (row.startsWith('fold')) {
            instructions.push(row.split(' ').pop())
        } else {
            let rowArray = row.split(',').map(Number)

            if (rowArray[0] > maxX) {
                maxX = rowArray[0]
            }
            if (rowArray[1] > maxY) {
                maxY = rowArray[1]
            }

            rows.push(rowArray)
        }
    })

    let matrix = generateMatrixByMaxValue(maxX, maxY)

    rows.forEach(([x, y]) => {
        matrix[y][x] = 1
    })

    let dotsCount = 0

    instructions.forEach(instruct => {
        let [axis, lineNumberStr] = instruct.split('=')
        let lineNumber = parseInt(lineNumberStr, 10)

        if (axis === 'x') {
            let partOne = matrix.map(el => el.slice(0, lineNumber))
            let partTwo = matrix.map(el => el.slice(lineNumber + 1, el.length))

            for (let i = 0; i < partTwo.length; i++) {
                let firstPartJ = lineNumber - 1

                for (let j = 0; j < partTwo[i].length; j++) {
                    let ptOneValue = partOne[i][firstPartJ]
                    let ptTwoValue = partTwo[i][j]

                    partOne[i][firstPartJ] = ptOneValue || ptTwoValue || 0
                    firstPartJ--
                }
            }
            matrix = partOne
        }

        if (axis === 'y') {
            let firstRowI = lineNumber - 1
            let partOne = matrix.slice(0, lineNumber)
            let partTwo = matrix.slice(lineNumber + 1, matrix.length)

            for (let i = 0; i < partTwo.length; i++) {
                for (let j = 0; j < partTwo[i].length; j++) {
                    let ptOneValue = partOne[firstRowI][j]
                    let ptTwoValue = partTwo[i][j]

                    partOne[firstRowI][j] = ptOneValue || ptTwoValue || 0
                }
                firstRowI--
            }
            matrix = partOne
        }


        if (dotsCount === 0) {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    dotsCount += matrix[i][j]
                }
            }
        }
    })

    printMatrix(matrix)

    return dotsCount
}

console.log('Dots:', getResult())