import fs from 'fs'

export const readFile = () => {
    return fs.readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean)
}

export const sumReducer = (previousValue, currentValue) => previousValue + currentValue

export const sumTo = (n) => {
    let sum = 0
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}