import {readFile} from '../../utils.js'

const solve = () => {
    let inputData = readFile('test.txt', {filterEmptyLines: false})
    let result = []
    let current = []
    inputData.forEach(el => {
        if (el) {
            current.push(el)
        } else {
            if (current.length) {
                result.push(current.reduce((acc, curr) => acc + Number(curr), 0))
                current = []
                if (result.length > 3) {
                    result.sort((a, b) => a > b ? -1 : a < b ? 1 : 0)
                    result = result.slice(0, 3)
                }
            }
        }
    })
    console.log('First:', Math.max(...result))
    console.log('Second:', result.reduce((acc, cur) => acc + cur, 0))
}

solve()


