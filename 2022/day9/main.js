import {readFile} from '../../utils.js'

const inputData = readFile('test.txt')

const Directions = {
    LEFT: 'L',
    RIGHT: 'R',
    DOWN: 'D',
    UP: 'U',
}
const solve = (snakeSize = 10) => {
    let visited = {}
    let snake = []
    for (let i = 0; i < snakeSize; i++) {
        snake.push([0, 0])
    }

    for (let row of inputData) {
        let [direction, step] = row.split(' ')
        step = +step
        let currentStep = 0
        while (currentStep < step) {
            if (direction === Directions.RIGHT) {
                snake[0][1]++
            }
            if (direction === Directions.DOWN) {
                snake[0][0]--
            }
            if (direction === Directions.LEFT) {
                snake[0][1]--
            }
            if (direction === Directions.UP) {
                snake[0][0]++
            }

            for (let i = 1; i < snake.length; i++) {
                let prev = snake[i - 1]
                let current = snake[i]
                if (Math.abs(prev[0] - current[0]) > 1 || Math.abs(prev[1] - current[1]) > 1) {
                    if (prev[0] === current[0]) {
                        if (prev[1] > current[1]) {
                            current[1]++
                        } else {
                            current[1]--
                        }
                    } else if (prev[1] === current[1]) {
                        if (prev[0] > current[0]) {
                            current[0]++
                        } else {
                            current[0]--
                        }
                    } else {
                        if (prev[0] > current[0]) {
                            current[0]++
                        } else {
                            current[0]--
                        }
                        if (prev[1] > current[1]) {
                            current[1]++
                        } else {
                            current[1]--
                        }
                    }
                }
            }
            visited[`${snake[snake.length - 1][0]}-${snake[snake.length - 1][1]}`] = 1
            currentStep++
        }
    }

    return Object.keys(visited).length
}

console.log('First:', solve(2))
console.log('Second:', solve(10))

