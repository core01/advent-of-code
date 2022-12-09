import {readFile} from '../../utils.js'

const inputData = readFile('test.txt')[0]

const getFirst = (indicatorPosition = 14) => {
    for (let i = indicatorPosition - 1; i < inputData.length; i++) {
        let charsSet = new Set()
        for (let j = indicatorPosition - 1; j >= 0; j--) {
            charsSet.add(inputData[i - j])
        }

        if (charsSet.size === indicatorPosition) {
            return i + 1
        }
    }
}

console.log('First: ', getFirst(4))
console.log('First: ', getFirst(14))
