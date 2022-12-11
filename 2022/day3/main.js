import { readFile } from '../../utils.js'

const inputData = readFile('test.txt')

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE_GAP = 26
const priorities = {}

const lowerCaseAlphabetArray = alphabet.split('')
lowerCaseAlphabetArray.forEach((value, index) => {
  priorities[value] = index + 1
})

let sum = 0
inputData.forEach((backPack) => {
  const [firstPart, secondPart] = [
    backPack.slice(0, backPack.length / 2),
    backPack.slice(backPack.length / 2, backPack.length),
  ]
  const firstPartArray = firstPart.split('')
  let found = false
  for (let char of firstPartArray) {
    if (found) continue
    if (secondPart.indexOf(char) !== -1) {
      let prior = 0
      if (char === char.toUpperCase()) {
        prior = priorities[char.toLowerCase()] + UPPERCASE_GAP
      } else {
        prior = priorities[char]
      }
      sum += prior
      found = true
    }
  }
})
let secondSum = 0
for (let i = 0; i < inputData.length; i += 3) {
  const group = inputData.slice(i, i + 3)
  alphabet.split('').forEach((char) => {
    if (group.every((row) => row.includes(char))) {
      secondSum += priorities[char]
    }
    if (group.every((row) => row.includes(char.toUpperCase()))) {
      secondSum += priorities[char] + UPPERCASE_GAP
    }
  })
}
console.log('First:', sum)
console.log('Second:', secondSum)
