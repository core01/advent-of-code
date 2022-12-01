import {getMatrixAdjacentLocations, readFile} from '../../utils.js'



const getFirst = () => {
    const rows = readFile()
    const min = []
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            const {left, top, right, bottom, center} = getMatrixAdjacentLocations(rows, i, j)
            const candidates = [right, left, bottom, top].filter(isFinite)

            if (candidates.every(el => center < el)) {
                min.push(center)
            }
        }
    }

    return min.reduce((prev, current) => prev + current + 1, 0)
}
let visitedCoordinates = []
const findAllMoreValues = (rows, i, j, compareValue) => {
    const {
        bottom,
        bottomCoordinates,
        left,
        leftCoordinates,
        right,
        rightCoordinates,
        top,
        topCoordinates,
    } = getMatrixAdjacentLocations(rows, i, j)
    let coordinates = []

    for (let [key, location] of [[left, leftCoordinates], [right, rightCoordinates], [top, topCoordinates], [bottom, bottomCoordinates]]) {
        if (key !== Infinity && key !== 9 && !visitedCoordinates.some(el => el[0] === location[0] && el[1] === location[1])) {
            if (key > compareValue) {
                visitedCoordinates.push(location)
                coordinates.push(location, ...findAllMoreValues(rows, location[0], location[1], key))
            }
        }
    }

    return coordinates
}
const findAllLessValues = (rows, i, j, compareValue) => {
    const {
        bottom,
        bottomCoordinates,
        left,
        leftCoordinates,
        right,
        rightCoordinates,
        top,
        topCoordinates,
    } = getMatrixAdjacentLocations(rows, i, j)
    let coordinates = []

    for (let [key, location] of [[left, leftCoordinates], [right, rightCoordinates], [top, topCoordinates], [bottom, bottomCoordinates]]) {
        if (key !== Infinity && key !== 9) {
            if (key < compareValue && !visitedCoordinates.some(el => el[0] === location[0] && el[1] === location[1])) {
                visitedCoordinates.push(location)
                coordinates.push(location, ...findAllLessValues(rows, location[0], location[1], key))
            }
            if (key === compareValue + 1) {
                visitedCoordinates.push(location)
                coordinates.push(location, ...findAllMoreValues(rows, location[0], location[1], key))
            }
        }
    }

    return coordinates
}

const getSecond = () => {
    const rows = readFile()
    const basin = []

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            const {
                center,
                centerCoordinates,
            } = getMatrixAdjacentLocations(rows, i, j)

            if (center === 9 || visitedCoordinates.some(el => el[0] === i && el[1] === j)) continue

            const moreValues = findAllMoreValues(rows, centerCoordinates[0], centerCoordinates[1], center)
            const minValues = findAllLessValues(rows, centerCoordinates[0], centerCoordinates[1], center)

            basin.push([centerCoordinates, ...moreValues, ...minValues])
        }
    }

    let filteredBasin = []

    basin.forEach(el => {
        let candidate = []
        el.forEach(e => {
            if (!candidate.some(can => can[0] === e[0] && can[1] === e[1])) candidate.push(e)
        })
        filteredBasin.push(candidate)
    })

    let sum = filteredBasin.map(el => el.length).sort((a, b) => b - a)

    return sum[0] * sum[1] * sum[2]
}

console.log('First: ', getFirst())
console.log('Second: ', getSecond())
