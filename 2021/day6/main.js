import {readFile, sumReducer} from '../../utils.js'

const inputData = readFile()

const getResult = (days) => {
    const data = inputData[0].split(',').map(el => parseInt(el, 10))

    let calendar = Array(9).fill(0)
    let nextDayCalendar = Array(9).fill(0)

    for (let i = 0; i < calendar.length; i++) {
        calendar[i] = data.filter(el => el === i).length
    }

    while (days !== 0) {
        for (let i = calendar.length - 1; i >= 0; i--) {
            if (i === 0) {
                nextDayCalendar[(calendar.length - 1)] = calendar[i] // put fish to 8 day
                nextDayCalendar[(calendar.length - 3)] += calendar[i] // put fish to 6 day
            } else {
                nextDayCalendar[i - 1] = calendar[i]
            }
        }

        days--
        calendar = [...nextDayCalendar]
    }

    return calendar.reduce(sumReducer)
}

console.log('First: ', getResult(80))
console.log('Second: ', getResult(256))
