import {generateMatrixByMaxValue, readFile} from '../../utils.js'
import util from 'util'

util.inspect.defaultOptions.depth = null

const inputData = readFile('test.txt')

const pairs = []
let maxX = -999999
let maxY = -999999
let minY = 0
let minX = 9999999

inputData.forEach(item => {
    const coordinates = item.split(' -> ')
    for (let i = 1; i < coordinates.length; i++) {
        const [x1, y1] = coordinates[i - 1].split(',').map(Number)
        const [x2, y2] = coordinates[i].split(',').map(Number);
        [x1, x2].forEach(x => {
            if (x > maxX) maxX = x
            if (x < minX) minX = x
        });
        [y1, y2].forEach(y => {
            if (y > maxY) maxY = y
        })
        pairs.push([[Number(x1), Number(y1)], [Number(x2), Number(y2)]])
    }
})


function solve({maxX, maxY, minX, minY}, part = 1) {
    // console.log({maxX,maxY, minX,minY})
    const matrix = generateMatrixByMaxValue(maxX, maxY)

    if(part === 2) {
        matrix[matrix.length-1].forEach((_,index) =>{
            matrix[matrix.length-1][index] = 8;
        })
    }

    pairs.forEach(([from, to]) => {
        const [x1, y1] = from
        const [x2, y2] = to
        if (x1 === x2) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                matrix[y][x1] = 8
            }
        }
        if (y1 === y2) {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                matrix[y1][x] = 8
            }
        }

    })


    let sandCount = 0
    let canProceedSand = true
    const initial = [0, 500]
    while (canProceedSand) {
        let [y, x] = initial
        while (true) {
            let cell = matrix[y][x]
            let bottomCell = matrix[y + 1]?.[x]
            let leftDiagonalCell = matrix[y + 1]?.[x - 1]
            let rightDiagonalCell = matrix[y + 1]?.[x + 1]

            if (x > maxX || y > maxY || y < minY || x < minX || (cell === 8 && bottomCell === 8 && leftDiagonalCell === 8 && rightDiagonalCell === 8)) {
                canProceedSand = false
                break
            }
            if (bottomCell !== undefined && y + 1 <= maxY) {
                if (bottomCell === 0) {
                    y++
                    continue
                }
                if (bottomCell === 8) {
                    if (leftDiagonalCell !== undefined) {
                        if (leftDiagonalCell === 0) {
                            x = x - 1
                            y++
                            continue
                        }
                    }
                    if (rightDiagonalCell !== undefined) {
                        if (rightDiagonalCell === 0) {
                            x = x + 1
                            y++
                            continue
                        }
                    }
                    if (cell !== 8) {
                        matrix[y][x] = 8
                        sandCount++
                        break
                    }
                }
            } else {
                canProceedSand = false
                break
            }
        }
    }

    return sandCount
}

console.log('First:', solve({maxX, maxY, minX, minY}))
console.log('Second:', solve({maxX: 1000, minX: -1000, maxY: maxY+2, minY}, 2))
