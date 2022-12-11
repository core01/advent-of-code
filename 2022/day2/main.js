const inputData = readFile('test.txt')

import { readFile } from '../../utils.js'

const getFirst = () => {
  const ROCK = ['A', 'X']
  const PAPER = ['B', 'Y']
  const SCISSORS = ['C', 'Z']

  const opponentBaseScores = {
    X: 1, // Rock
    Y: 2, // Paper
    Z: 3, // Scissors
  }

  let result = 0

  const checkResult = (p1, p2) => {
    if (
      (ROCK.includes(p1) && ROCK.includes(p2)) ||
      (PAPER.includes(p1) && PAPER.includes(p2)) ||
      (SCISSORS.includes(p1) && SCISSORS.includes(p2))
    ) {
      return 3
    }
    if (
      (ROCK.includes(p1) && PAPER.includes(p2)) ||
      (PAPER.includes(p1) && SCISSORS.includes(p2)) ||
      (SCISSORS.includes(p1) && ROCK.includes(p2))
    ) {
      return 6
    }
    if (
      (ROCK.includes(p1) && SCISSORS.includes(p2)) ||
      (PAPER.includes(p1) && ROCK.includes(p2)) ||
      (SCISSORS.includes(p1) && PAPER.includes(p2))
    ) {
      return 0
    }
    throw new Error('WOW')
  }
  inputData.forEach((pair) => {
    const [p1, p2] = pair.split(' ')
    result += checkResult(p1, p2) + opponentBaseScores[p2]
  })
  return result
}

const getSecond = () => {
  const ROCK = 'A'
  const PAPER = 'B'
  const SCISSORS = 'C'

  const WIN = 'Z'
  const DRAW = 'Y'
  const LOSE = 'X'

  const SCORES = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
  }

  const getRoundResult = (item, result) => {
    let roundResult = 0
    if (result === WIN) {
      roundResult = 6
      if (item === ROCK) {
        return SCORES[PAPER] + roundResult
      }
      if (item === PAPER) {
        return SCORES[SCISSORS] + roundResult
      }
      if (item === SCISSORS) {
        return SCORES[ROCK] + roundResult
      }
    }
    if (result === DRAW) {
      return SCORES[item] + 3
    }
    if (result === LOSE) {
      if (item === ROCK) {
        return SCORES[SCISSORS]
      }
      if (item === SCISSORS) {
        return SCORES[PAPER]
      }
      if (item === PAPER) {
        return SCORES[ROCK]
      }
    }
  }
  let sum = 0
  inputData.forEach((pair) => {
    const [item, result] = pair.split(' ')
    sum += getRoundResult(item, result)
  })
  return sum
}
console.log('First:', getFirst())
console.log('Second:', getSecond())
