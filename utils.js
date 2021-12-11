import fs from 'fs'

export const readFile = () => {
    return fs.readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean)
}

export const sumReducer = (previousValue, currentValue) => previousValue + currentValue

export const sumTo = (n) => {
    let sum = 0
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}

export const getMatrixAdjacentLocations = (rows, i, j) => {
    let bottom = Infinity
    let bottomCoordinates = []
    let center = parseInt(rows[i][j], 10)
    let centerCoordinates = [i, j]
    let left = Infinity
    let leftBottom = Infinity
    let leftBottomCoordinates = []
    let leftCoordinates = []
    let leftTop = Infinity
    let leftTopCoordinates = []
    let right = Infinity
    let rightBottom = Infinity
    let rightBottomCoordinates = []
    let rightCoordinates = []
    let rightTop = Infinity
    let rightTopCoordinates = []
    let top = Infinity
    let topCoordinates = []

    if (i > 0) {
        top = parseInt(rows[i - 1][j], 10)
        topCoordinates = [i - 1, j]
    }
    if (i + 1 < rows.length) {
        bottom = parseInt(rows[i + 1][j], 10)
        bottomCoordinates = [i + 1, j]
    }
    if (j > 0) {
        left = parseInt(rows[i][j - 1], 10)
        leftCoordinates = [i, j - 1]
    }
    if (j + 1 < rows[i].length) {
        right = parseInt(rows[i][j + 1], 10)
        rightCoordinates = [i, j + 1]
    }
    if (j + 1 < rows[i].length && i + 1 < rows.length) {
        rightBottom = parseInt(rows[i + 1][j + 1], 10)
        rightBottomCoordinates = [i + 1, j + 1]
    }
    if (j > 0 && i > 0) {
        leftTop = parseInt(rows[i - 1][j - 1], 10)
        leftTopCoordinates = [i - 1, j - 1]
    }
    if (j + 1 < rows[i].length && i > 0) {
        rightTop = parseInt(rows[i - 1][j + 1], 10)
        rightTopCoordinates = [i - 1, j + 1]
    }
    if (i + 1 < rows.length && j > 0) {
        leftBottom = parseInt(rows[i + 1][j - 1], 10)
        leftBottomCoordinates = [i + 1, j - 1]
    }


    return {
        bottom,
        bottomCoordinates,
        center,
        centerCoordinates,
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
    }
}