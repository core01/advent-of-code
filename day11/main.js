import {getMatrixAdjacentLocations, readFile} from '../utils.js'

const inputData = readFile()

const collectLightCandidates = (rows) => {
    const toLight = []

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            rows[i][j]++

            if (rows[i][j] === 10) {
                toLight.push([i, j])
            }
        }
    }

    return toLight
}
const lightOctopus = (rows, i, j) => {
    let toLight = []
    const {
        bottom,
        bottomCoordinates,
        left,
        leftBottom,
        leftBottomCoordinates,
        leftCoordinates,
        leftTop,
        leftTopCoordinates,
        right,
        rightBottom,
        rightBottomCoordinates,
        rightCoordinates,
        rightTop,
        rightTopCoordinates,
        top,
        topCoordinates,
    } = getMatrixAdjacentLocations(rows, i, j)

    rows[i][j] = 0

    for (let [value, coordinates] of [
        [left, leftCoordinates], [right, rightCoordinates], [top, topCoordinates], [bottom, bottomCoordinates], [leftTop, leftTopCoordinates], [rightTop, rightTopCoordinates], [leftBottom, leftBottomCoordinates], [rightBottom, rightBottomCoordinates],
    ]) {
        if (isFinite(value) && value !== 0) {
            let [i, j] = coordinates
            rows[i][j]++

            if (rows[i][j] === 10) {
                toLight.push([i, j])
            }
        }
    }
    return toLight
}
const getFirst = () => {
    let rows = inputData.map(el => el.split('').map(str => parseInt(str, 10)))
    let flashingCount = 0
    let steps = 0

    while (steps < 100) {
        let toLight = collectLightCandidates(rows)

        while (toLight.length) {
            const [i, j] = toLight.pop()
            flashingCount++
            toLight.push(...lightOctopus(rows, i, j))
        }
        steps++
    }

    return flashingCount
}

const getSecond = () => {
    let rows = inputData.map(el => el.split('').map(str => parseInt(str, 10)))
    let flashingCount = 0
    let stepWhenAllZero
    let step = 0

    while (!stepWhenAllZero) {
        const toLight = collectLightCandidates(rows)

        while (toLight.length) {
            const [i, j] = toLight.pop()
            flashingCount++
            toLight.push(...lightOctopus(rows, i, j))
        }
        step++

        if (rows.every(row => row.every(el => el === 0))) {
            stepWhenAllZero = step
        }
    }

    return stepWhenAllZero
}

console.log('First: ', getFirst())
console.log('Second:', getSecond())