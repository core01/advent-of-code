import { generateMatrixByMaxValue, readFile } from '../../utils.js'

const inputData = readFile()

const findMinMaxValues = (value1, value2) =>
  value1 > value2 ? [value2, value1] : [value1, value2]

function isLinear(x1, y1, x2, y2) {
  return x1 === x2 || y1 === y2
}

function getCoordinates(el) {
  return [el[0][0], el[0][1], el[1][0], el[1][1]]
}

const prepareData = (inputData) => {
  let maxValue = 0
  const data = inputData.map((el) =>
    el.split(' -> ').map((el) => el.split(',').map((el) => parseInt(el, 10)))
  )

  data.forEach((row) => {
    let currentMax = Math.max(...getCoordinates(row))
    if (currentMax > maxValue) maxValue = currentMax
  })

  return [data, maxValue]
}

const processResult = (processLinearOnly = false) => {
  const [preparedData, maxValue] = prepareData(inputData, false)
  const matrix = generateMatrixByMaxValue(maxValue, maxValue)

  let numberOfLinesOverlap = 0
  const visitedCoordinates = []

  let data = processLinearOnly
    ? preparedData.filter((el) => isLinear(...getCoordinates(el)))
    : preparedData

  data.forEach((el) => {
    const [x1, y1, x2, y2] = getCoordinates(el)

    const arrayOfCoordinates = []
    if (!isLinear(x1, y1, x2, y2)) {
      let currentX = x1
      let currentY = y1

      do {
        arrayOfCoordinates.push({ x: currentX, y: currentY })

        if (x1 > x2) currentX--
        else currentX++
        if (y1 > y2) currentY--
        else currentY++
      } while (x1 > x2 ? currentX >= x2 : currentX <= x2)
    } else {
      const [startX, endX] = findMinMaxValues(x1, x2)
      const [startY, endY] = findMinMaxValues(y1, y2)
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          arrayOfCoordinates.push({ x, y })
        }
      }
    }

    arrayOfCoordinates.forEach(({ x, y }) => {
      matrix[x][y]++

      if (
        matrix[x][y] > 1 &&
        !visitedCoordinates.some(
          (visited) => visited.x === x && visited.y === y
        )
      ) {
        visitedCoordinates.push({ x, y })
        numberOfLinesOverlap++
      }
    })
  })

  return numberOfLinesOverlap
}

console.log('First: ', processResult(true))
console.log('Second: ', processResult(false))
