import { readFile, sumReducer } from '../../utils.js'

const getFirst = () => {
  const inputData = readFile().map((el) => el.split('| ').pop())

  return inputData
    .map((el) =>
      el.split(' ').filter((rowEl) => [2, 3, 4, 7].includes(rowEl.length))
    )
    .map((el) => el.length)
    .reduce(sumReducer)
}

const getSecond = () => {
  const rows = readFile()
  const result = []
  for (let i = 0; i < rows.length; i++) {
    const [firstPart, secondPart] = rows[i].split(' | ')
    const others = []
    const numbersObject = {}

    firstPart.split(' ').forEach((str) => {
      const chars = str.split('')
      if (chars.length === 2) {
        numbersObject[1] = chars
      } else if (chars.length === 4) {
        numbersObject[4] = chars
      } else if (chars.length === 3) {
        numbersObject[7] = chars
      } else if (chars.length === 7) {
        numbersObject[8] = chars
      } else {
        others.push(chars)
      }
    })

    numbersObject['3'] = others
      .filter(
        (el) =>
          el.length === 5 &&
          numbersObject['1'].every((letter) => el.includes(letter))
      )
      .pop()
    numbersObject['9'] = others
      .filter(
        (el) =>
          el.length === 6 &&
          numbersObject['3'].every((letter) => el.includes(letter)) &&
          numbersObject['4'].every((letter) => el.includes(letter))
      )
      .pop()
    numbersObject['6'] = others
      .filter(
        (el) =>
          el.length === 6 &&
          !numbersObject['3'].every((letter) => el.includes(letter)) &&
          !numbersObject['4'].every((letter) => el.includes(letter)) &&
          !numbersObject['1'].every((letter) => el.includes(letter))
      )
      .pop()
    numbersObject['0'] = others
      .filter(
        (el) =>
          el.length === 6 &&
          !numbersObject['6'].every((six) => el.includes(six)) &&
          !numbersObject['9'].every((nine) => el.includes(nine))
      )
      .pop()
    numbersObject['5'] = others
      .filter(
        (el) =>
          el.length === 5 &&
          el.every((five) => numbersObject['6'].includes(five))
      )
      .pop()
    numbersObject['2'] = others
      .filter(
        (el) =>
          el.length === 5 &&
          !el.every((two) => numbersObject[5].includes(two)) &&
          !el.every((two) => numbersObject[3].includes(two))
      )
      .pop()

    const secondPartArray = secondPart.split(' ')
    let resStr = ''

    for (let str of secondPartArray) {
      for (let num in numbersObject) {
        if (
          numbersObject[num].every((el) => str.includes(el)) &&
          str.length === numbersObject[num].length
        ) {
          resStr += num
        }
      }
    }

    result.push(resStr)
  }

  return result.map((el) => parseInt(el, 10)).reduce(sumReducer)
}

console.log('First: ', getFirst())
console.log('Second: ', getSecond())
