import {readFile} from '../../utils.js'

const inputData = readFile('test.txt', {filterEmptyLines: false})

const data = [...inputData]
const emptyLineIndex = data.indexOf('')
const instructions = data.splice(emptyLineIndex).filter(Boolean)

const solve = (reverse = false) => {
    const columns = {}
    data.forEach(str => {
        let containerRowIndex = 1
        for (let i = 1; i < str.length; i += 4) {
            let char = str[i]
            if (char.trim()) {
                if (!columns[containerRowIndex]) {
                    columns[containerRowIndex] = []
                }
                columns[containerRowIndex].push(char)

            }
            containerRowIndex++
        }
    })

    instructions.forEach(instruction => {
        const [, count, , colFrom, , colTo] = instruction.split(' ')
        const parts = columns[colFrom].splice(0, +count)
        if (reverse) parts.reverse()
        columns[colTo].unshift(...parts)
    })

    let top = ''
    for (let key in columns) {
        top += columns[key][0]
    }
    return top
}

console.log('First:', solve(true))
console.log('Second:', solve(false))
