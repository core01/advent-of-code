import { readFile } from '../../utils.js'
import util from 'util'

util.inspect.defaultOptions.depth = null

const inputData = readFile('day18/test.txt')
const rows = []
// inputData.forEach(row => {
//     rows.push(eval(row));
// })

inputData.forEach((row) => {
  let depth = -1
  let newRow = []
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '[') {
      depth++
      continue
    }
    if (row[i] === ']') {
      depth--
      continue
    }
    if (row[i] === ',') continue
    newRow.push({ value: parseInt(row[i], 10), depth })
  }
  rows.push(newRow)
  newRow = []
})

const add = (a, b) => {
  let currentRow = a.map((el) => ({ ...el, depth: el.depth + 1 }))
  let nextRow = b.map((el) => ({ ...el, depth: el.depth + 1 }))

  return [...currentRow, ...nextRow]
}

let resultRows = []
for (let i = 0; i < rows.length; i += 2) {
  let newRow = add(rows[i], rows[i + 1])
  let explodeIndex = newRow.findIndex((el) => el.depth === 4)
  if (explodeIndex > -1) {
    let isHasLeftRegularNumber =
      explodeIndex > 0 &&
      newRow[explodeIndex - 1].depth === newRow[explodeIndex].depth - 1
    let isHasRightRegularNumber =
      newRow[explodeIndex + 2].depth === newRow[explodeIndex + 1].depth - 1
    if (isHasLeftRegularNumber) {
      newRow[explodeIndex - 1].value =
        newRow[explodeIndex - 1].value + newRow[explodeIndex].value
    }
    if (isHasRightRegularNumber) {
      newRow[explodeIndex + 2].value =
        newRow[explodeIndex + 2].value + newRow[explodeIndex + 1].value
    }
    newRow.splice(explodeIndex, 1)
    newRow[explodeIndex + 1].depth--
    newRow[explodeIndex + 1].value = 0
  }
  resultRows.push(newRow)
}

console.log(resultRows)
