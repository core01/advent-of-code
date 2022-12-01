import {readFile} from '../../utils.js'

const inputData = readFile()

let template = inputData.shift()

const getLastResult = (attempts) => {
    let patternsMap = {}
    let charMap = {}
    let nextElementsMap = {}

    inputData.forEach(el => {
        let [pattern, result] = el.split(' -> ')

        patternsMap[pattern] = 0
        nextElementsMap[pattern] = result
    })

    for (let i = 0; i < template.length; i++) {
        let property = template[i]

        if (!(property in charMap)) {
            charMap[property] = 0
        }

        charMap[property]++

        if (i < template.length - 1) {
            let pattern = `${template[i]}${template[i + 1]}`
            patternsMap[pattern]++
        }
    }

    for (let i = 0; i < attempts; i++) {
        let newPatternMap = {}

        for (let pattern in patternsMap) {
            let nextElement = nextElementsMap[pattern]
            let count = patternsMap[pattern]
            let newPairs = [`${pattern[0]}${nextElement}`, `${nextElement}${pattern[1]}`]

            if (!(nextElement in charMap)) {
                charMap[nextElement] = 0
            }

            charMap[nextElement] += count

            newPairs.forEach(newPair => {
                if (!(newPair in newPatternMap)) {
                    newPatternMap[newPair] = 0
                }

                newPatternMap[newPair] += count
            })
        }

        patternsMap = {...newPatternMap}
    }

    let maxCount = 0
    let minCount = Infinity

    for (let key in charMap) {
        if (charMap[key] > maxCount) maxCount = charMap[key]
        if (charMap[key] < minCount) minCount = charMap[key]
    }

    return maxCount - minCount
}

console.log('First:', getLastResult(10))
console.log('Second:', getLastResult(40))
