import {readFile} from '../../utils.js'
import util from 'util'

util.inspect.defaultOptions.depth = null

const inputData = readFile('test.txt')
/**
 * First part
 */
let indexesSum = 0

const isCorrect = (left, right) => {
    let maxI = Math.max(left.length, right.length)
    for (let i = 0; i < maxI; i++) {
        const leftItem = left[i]
        const rightItem = right[i]
        if (Array.isArray(leftItem) && Array.isArray(rightItem)) {
            const res = isCorrect(leftItem, rightItem)
            if (res === false || res === true) {
                return res
            }
            continue
        } else if (leftItem === undefined) {
            return true
        } else if (rightItem === undefined) {
            return false
        } else if (leftItem < rightItem) {
            return true
        } else if (leftItem > rightItem) {
            return false
        } else if (leftItem === rightItem) {
            continue
        } else if (Array.isArray(leftItem) && !Array.isArray(rightItem)) {
            const res = isCorrect(leftItem, [rightItem])
            if (res === false || res === true) {
                return res
            }
            continue
        } else if (!Array.isArray(leftItem) && Array.isArray(rightItem)) {
            const res = isCorrect([leftItem], rightItem)
            if (res === false || res === true) {
                return res
            }
            continue
        }
    }
}
let j = 1
for (let i = 0; i < inputData.length; i += 2) {
    const leftPair = eval(inputData[i])
    const rightPair = eval(inputData[i + 1])
    if (isCorrect(leftPair, rightPair) !== false) {
        indexesSum += j
    }
    j++
}

/**
 * Second part
 */
inputData.push('[[2]]', '[[6]]')

inputData.sort((a, b) => {
    if (isCorrect(eval(a), eval(b))) {
        return 0
    } else {
        return -1
    }
})

inputData.reverse()

/**
 * Result
 */
console.log('First', indexesSum)
console.log('Second:', (inputData.indexOf('[[6]]') + 1) * (inputData.indexOf('[[2]]') + 1))
