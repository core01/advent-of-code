import _ from 'lodash'
import { readFile } from '../../utils.js'

const inputData = readFile('test.txt')

let monkeys = []
let newBoredDivider = 1
for (let i = 0; i < inputData.length; i = i + 6) {
  let acc = inputData
  const items = acc[i + 1]
    .split('  Starting items: ')[1]
    .split(', ')
    .map((item) => +item)
  const operation = acc[i + 2].split('  Operation: new = ')[1]
  const test = +acc[i + 3].split('  Test: divisible by ')[1]
  const ifTrue = +acc[i + 4].split(' ').at(-1)
  const ifFalse = +acc[i + 5].split(' ').at(-1)
  monkeys.push({
    items,
    operation,
    test,
    ifTrue,
    ifFalse,
    inspectionsCount: 0,
  })
  newBoredDivider *= test
}

const solve = (part = 1) => {
  let localMonkeys = _.cloneDeep(monkeys)
  const rounds = part === 1 ? 20 : 10000
  for (let i = 0; i < rounds; i++) {
    for (let monkey of localMonkeys) {
      for (let item of monkey.items) {
        let worryLevel = eval(monkey.operation.replaceAll('old', item))
        if (part === 2) {
          worryLevel = worryLevel % newBoredDivider
        } else {
          worryLevel = Math.floor(worryLevel / 3)
        }
        if (worryLevel % monkey.test === 0) {
          localMonkeys[monkey.ifTrue].items.push(worryLevel)
        } else {
          localMonkeys[monkey.ifFalse].items.push(worryLevel)
        }
        monkey.inspectionsCount++
      }
      monkey.items = []
    }
  }

  localMonkeys.sort((a, b) =>
    a.inspectionsCount > b.inspectionsCount
      ? -1
      : a.inspectionsCount < b.inspectionsCount
      ? 1
      : 0
  )

  return localMonkeys[0].inspectionsCount * localMonkeys[1].inspectionsCount
}

console.log('First: ', solve(1))
console.log('Second: ', solve(2))
