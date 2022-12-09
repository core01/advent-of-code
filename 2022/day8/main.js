import {readFile} from '../../utils.js'

const inputData = readFile('test.txt')

let result = inputData.map(row => row.split('').map(item => +item))


let visibleTrees = {}
const addToVisibleTrees = (i, j, value, object) => {
    object[`${i}-${j}`] = value
}

// fill round
let visibleFromTheTop = {}
for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
        if (i === 0 || i === result.length - 1 || j === 0 || j === result[i].length - 1) {
            addToVisibleTrees(i, j, result[i][j], visibleTrees)
        }
    }
}
let topMax = {}
// top
for (let i = 1; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
        if (!topMax[j]) {
            topMax[j] = []
        }
        const value = result[i][j]
        if (value > Math.max(...topMax[j], result[0][j])) {
            addToVisibleTrees(i, j, value, visibleFromTheTop)
        }
        topMax[j].push(value)
    }
}
let visibleFromTheLeft = {}

// left
const leftMax = {}
for (let j = 0; j < result[0].length - 1; j++) {
    for (let i = 0; i < result.length; i++) {
        if (!leftMax[i]) {
            leftMax[i] = []
        }
        const value = result[i][j]
        if (value > Math.max(...leftMax[i], result[i][0])) {
            addToVisibleTrees(i, j, value, visibleFromTheLeft)
        }
        leftMax[i].push(value)
    }
}

// right
const rightMax = {}
let visibleFromTheRight = {}
for (let j = result[0].length - 1; j > 0; j--) {
    for (let i = 0; i < result.length; i++) {
        if (!rightMax[i]) {
            rightMax[i] = []
        }
        const value = result[i][j]
        if (value > Math.max(...rightMax[i], result[i][result[0].length - 1])) {
            addToVisibleTrees(i, j, value, visibleFromTheRight)
        }
        rightMax[i].push(value)
    }
}

// bottom
let bottomMax = {}
let visibleFromTheBottom = {}
for (let i = result.length - 2; i > 1; i--) {
    for (let j = 0; j < result[0].length; j++) {
        const value = result[i][j]
        if (!bottomMax[j]) {
            bottomMax[j] = []
        }
        if (value > Math.max(...bottomMax[j], result[result.length - 1][j])) {
            addToVisibleTrees(i, j, value, visibleFromTheBottom)
        }
        bottomMax[j].push(value)
    }
}

const totalObject = {...visibleTrees, ...visibleFromTheLeft, ...visibleFromTheTop, ...visibleFromTheRight, ...visibleFromTheBottom}

console.log('First:', Object.keys(totalObject).length)

const matrix = {}
for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
        let key = `${i}-${j}`
        matrix[key] = {
            right: 0,
            left: 0,
            bottom: 0,
            top: 0,
        }
        let hasRightView = true
        let localJ = j
        let prevValue = result[i][j]
        let maxSideValues = [prevValue]
        while (hasRightView) {
            localJ++
            if (result[i].hasOwnProperty(localJ)) {
                let nextValue = result[i][localJ]

                if (nextValue < Math.max(...maxSideValues)) {
                    matrix[key].right++
                    maxSideValues.push(nextValue)
                    prevValue = nextValue
                } else {
                    matrix[key].right++
                    hasRightView = false
                }
            } else {
                hasRightView = false
            }
        }
        let hasLeftView = true
        localJ = j
        prevValue = result[i][j]
        maxSideValues = [prevValue]
        while (hasLeftView) {
            localJ--
            if (result[i].hasOwnProperty(localJ)) {
                let nextValue = result[i][localJ]
                if (nextValue < Math.max(...maxSideValues)) {
                    matrix[key].left++
                    maxSideValues.push(nextValue)
                    prevValue = nextValue
                } else {
                    matrix[key].left++
                    hasLeftView = false
                }
            } else {
                hasLeftView = false
            }
        }

        let hasTopView = true
        let localI = i
        prevValue = result[i][j]
        maxSideValues = [prevValue]
        while (hasTopView) {
            localI--
            if (result.hasOwnProperty(localI)) {
                let nextValue = result[localI][j]
                if (nextValue < Math.max(...maxSideValues)) {
                    matrix[key].top++
                    maxSideValues.push(nextValue)
                    prevValue = nextValue
                } else {
                    matrix[key].top++
                    hasTopView = false
                }
            } else {
                hasTopView = false
            }
        }
        let HasBottomView = true
        localI = i
        prevValue = result[i][j]
        maxSideValues = [prevValue]
        while (HasBottomView) {
            localI++
            if (result.hasOwnProperty(localI)) {
                let nextValue = result[localI][j]
                if (nextValue < Math.max(...maxSideValues)) {
                    matrix[key].bottom++
                    maxSideValues.push(nextValue)
                    prevValue = nextValue
                } else {
                    matrix[key].bottom++
                    HasBottomView = false
                }
            } else {
                HasBottomView = false
            }
        }
    }
}

let max = 0

for (let key in matrix) {
    let obj = matrix[key]
    let result = obj.right * obj.left * obj.top * obj.bottom
    if (max < result) {
        max = result
    }
}

console.log('Second:', max)
