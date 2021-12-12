import {isLowerCase, readFile} from '../utils.js'

const inputData = readFile().map((line) => line.split('-'))

const generateMapObject = () => {
    const pathObject = {}

    inputData.forEach(([el1, el2]) => {
        if (!pathObject.hasOwnProperty(el1)) {
            pathObject[el1] = []
        }

        if (!pathObject.hasOwnProperty(el2)) {
            pathObject[el2] = []
        }
        if (el1 !== 'start') pathObject[el2].push(el1)
        if (el2 !== 'start') pathObject[el1].push(el2)
    })

    return pathObject
}

const findAllPaths = (pathObject, pathArray = ['start'], allowVisitSmallCaveTwice = false) => {
    let foundPaths = []
    const from = pathArray[pathArray.length - 1]

    for (const to of pathObject[from]) {
        const lowerCaseMembers = pathArray.filter(el => isLowerCase(el) && el !== 'start' && el !== 'end')
        let hasSomeLowerCase2Times = false
        let ob = {}

        lowerCaseMembers.forEach(el => {
            if (!ob.hasOwnProperty(el)) {
                ob[el] = 0
            }
            ob[el]++

            if (ob[el] > 1) {
                hasSomeLowerCase2Times = true
            }
        })


        let shouldProceedWithCave = allowVisitSmallCaveTwice && !(isLowerCase(to) && hasSomeLowerCase2Times
                && pathArray.filter(el => el === to).length > 0)
            || !allowVisitSmallCaveTwice && !(isLowerCase(to) && pathArray.includes(to))

        if (shouldProceedWithCave) {
            const newPath = [...pathArray, to]

            if (to === 'end') {
                foundPaths.push(newPath)
            } else {
                foundPaths.push(...findAllPaths(pathObject, newPath, allowVisitSmallCaveTwice))
            }
        }
    }

    return foundPaths
}

const getFirst = () => {
    const pathObject = generateMapObject()
    const newValidPathArray = findAllPaths(pathObject, ['start'])

    return newValidPathArray.length
}

const getSecond = () => {
    const pathObject = generateMapObject()
    const validPathArray = findAllPaths(pathObject, ['start'], true)

    return validPathArray.length
}

console.log('First:', getFirst())
console.log('Second:', getSecond())