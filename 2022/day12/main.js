import { readFile } from '../../utils.js'

const inputData = readFile('test.txt')

let endPosition = {}

const startPositions = []
let alphabet = 'abcdefghijklmnopqrstuvwxyz'

const solve = (part = 1) => {
  const seen = new Set()

  function getPossibleSteps(i, j) {
    const value = data[i][j]

    const top = [i - 1, j]
    const right = [i, j + 1]
    const left = [i, j - 1]
    const bottom = [i + 1, j]

    const steps = []
    for (let [locI, locJ] of [top, right, left, bottom]) {
      if (
        locI === -1 ||
        locJ === -1 ||
        data?.[locI]?.[locJ] === undefined ||
        data[locI][locJ] > value + 1 ||
        seen.has(`${locI}-${locJ}`)
      ) {
        continue
      }

      steps.push([locI, locJ])
    }
    return steps
  }

  const data = inputData.map((row, i) =>
    row.split('').map((char, j) => {
      let cost
      if (part === 1 ? char === 'S' : char === 'S' || char === 'a') {
        cost = 0
        startPositions.push([i, j])
      } else if (char === 'E') {
        cost = alphabet.length - 1
        endPosition = {
          i,
          j,
        }
      } else {
        cost = char.codePointAt(0) - 'a'.codePointAt(0)
      }
      return cost
    })
  )

  const queue = startPositions.map(([i, j]) => ({ i, j, steps: 0 }))

  while (queue.length) {
    let { i, j, steps } = queue.shift()
    const key = `${i}-${j}`

    if (seen.has(key)) {
      continue
    }
    if (i === endPosition.i && j === endPosition.j) {
      return steps // Optimal path will arrive to the destination first
    }
    const possibleSteps = getPossibleSteps(i, j).map(([li, lj]) => ({
      i: li,
      j: lj,
      steps: steps + 1,
    }))

    queue.push(...possibleSteps)

    seen.add(key)
  }
}

console.log('First:', solve(1))
console.log('Second:', solve(2))