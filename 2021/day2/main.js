import { readFile } from '../../utils.js'

const arr = readFile()

const inputData = arr.map((el) => el.split(' '))

const FORWARD_KEY = 'forward'
const UP_KEY = 'up'
const DOWN_KEY = 'down'

const getFirst = () => {
  let position = 0
  let depth = 0

  inputData.forEach(([key, stringValue]) => {
    const value = parseInt(stringValue, 10)
    switch (key) {
      case FORWARD_KEY:
        position = position + value
        break
      case UP_KEY:
        depth = depth - value
        break
      case DOWN_KEY:
        depth = depth + value
        break
      default:
        console.log('Oops')
        break
    }
  })

  return position * depth
}

const getSecond = () => {
  let aim = 0
  let position = 0
  let depth = 0
  inputData.forEach(([key, stringValue]) => {
    const value = parseInt(stringValue, 10)
    switch (key) {
      case FORWARD_KEY:
        position = position + value
        depth = aim === 0 ? depth : depth + aim * value
        break
      case DOWN_KEY:
        aim = aim + value
        break
      case UP_KEY:
        aim = aim - value
        break
      default:
        console.log('Oops')
        break
    }
  })
  return position * depth
}

console.log('Result 1:', getFirst())
console.log('Result 2:', getSecond())
