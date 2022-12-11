import { readFile, sumReducer } from '../../utils.js'

const inputData = readFile()
let bracketsPairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

let broken = []
const getFirst = () => {
  let points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }
  let foundObj = {}
  let queue = []

  for (let i = 0; i < inputData.length; i++) {
    for (let j = 0; j < inputData[i].length; j++) {
      const found = inputData[i][j]

      if (Object.keys(bracketsPairs).includes(found)) {
        queue.push(found)
      } else {
        if (found !== bracketsPairs[queue.pop()]) {
          broken.push(i)
          let foundValue = points[found]

          if (!foundObj.hasOwnProperty(foundValue)) {
            foundObj[foundValue] = 0
          }
          foundObj[foundValue]++

          break
        }
      }
    }
  }

  let multiplyArr = []

  for (let key in foundObj) {
    multiplyArr.push(foundObj[key] * key)
  }

  return multiplyArr.reduce(sumReducer)
}

const getSecond = () => {
  const inputData = readFile()
  let queue = []
  let points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }
  let scoreArray = []

  for (let i = 0; i < inputData.length; i++) {
    if (broken.includes(i)) continue

    for (let j = 0; j < inputData[i].length; j++) {
      let found = inputData[i][j]

      if (Object.keys(bracketsPairs).includes(found)) {
        queue.push(found)
      } else {
        queue.pop()
      }
    }

    scoreArray.push(
      queue
        .reverse()
        .map((el) => points[bracketsPairs[el]])
        .reduce((prev, current) => prev * 5 + current, 0)
    )
    queue = []
  }

  scoreArray.sort((a, b) => b - a)

  return scoreArray[Math.round((scoreArray.length - 1) / 2)]
}

console.log('First: ', getFirst())
console.log('Second: ', getSecond())
