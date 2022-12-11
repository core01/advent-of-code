import { readFile } from '../../utils.js'

const arr = readFile()

let increase = 0
for (let i = 1; i < arr.length; i++) {
  if (arr[i] > arr[i - 1]) increase++
}
console.log('Result 1:', increase)

const arrayOfMeasurements = []
for (let i = 0; i < arr.length - 3; i++) {
  arrayOfMeasurements.push([arr[i], arr[i + 1], arr[i + 2]])
}

increase = 0
const sumReducer = (previousValue, currentValue) => previousValue + currentValue

for (let i = 1; i < arrayOfMeasurements.length; i++) {
  const firstGroupSum = arrayOfMeasurements[i - 1].reduce(sumReducer)
  const secondGroupSum = arrayOfMeasurements[i].reduce(sumReducer)
  if (secondGroupSum > firstGroupSum) increase++
}

console.log('Result 2:', increase)
