import { readFile, sumTo } from '../../utils.js'

const getFirst = () => {
  let [inputData] = readFile()
  let positions = inputData.split(',').map((el) => parseInt(el, 10))
  let res = []
  positions.forEach((el) => {
    positions.forEach((otherEl) => {
      if (el !== otherEl) {
        res[el] += Math.abs(el - otherEl)
      } else {
        res[el] = 0
      }
    })
  })

  res = res.filter(Boolean)
  return Math.min(...res)
}

const getSecond = () => {
  let [inputData] = readFile()
  let positions = inputData.split(',').map((el) => parseInt(el, 10))

  const maxPosition = Math.max(...positions)
  const distances = Array(maxPosition + 1).fill(Infinity)

  for (let i = 0; i < distances.length; i++) {
    distances[i] = 0
    positions.forEach((el) => {
      distances[i] += sumTo(Math.abs(el - i))
    })
  }

  return Math.min(...distances)
}

console.log('First: ', getFirst())
console.log('Second: ', getSecond())
