import util from 'util'
import {readFile} from '../../utils.js'

util.inspect.defaultOptions.depth = null

const [xData, yData] = readFile().pop().split('target area: ').pop().split(', ')
const xValues = xData.split('=').pop()
const yValues = yData.split('=').pop()
const [x1, x2] = xValues.split('..').map(Number)
const [y1, y2] = yValues.split('..').map(Number)
const minY = Math.min(y1, y2)
const maxX = Math.max(x1, x2)

const getFirst = () => {
    let highestY = -Infinity
    let targetAreaSet = new Set()
    let velocitiesSet = new Set()

    const findInitialVelocity = (initialVelocityX, initialVelocityY) => {
        let highY = -Infinity
        let velocityX = initialVelocityX
        let velocityY = initialVelocityY
        let x = 0
        let y = 0

        while (x <= x2 && x >= 0 && x <= maxX && y >= minY) {
            x += velocityX
            y += velocityY

            if (y > highY) highY = y
            if (targetAreaSet.has(`${x}-${y}`)) {
                if (highY > highestY) highestY = highY
                velocitiesSet.add(`${initialVelocityX}-${initialVelocityY}`)

                break
            }

            velocityX += velocityX === 0 ? 0 : velocityX > 0 ? -1 : 1
            velocityY -= 1
        }
    }

    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            targetAreaSet.add(`${x}-${y}`)
        }
    }

    for (let x = -1000; x <= maxX; x++) {
        for (let y = minY; y < 1000; y++) {
            findInitialVelocity(x, y)
        }
    }

    return {highestY, velocities: velocitiesSet.size}
}
console.log('First', getFirst())

