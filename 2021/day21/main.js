import { readFile } from '../../utils.js'

const inputData = readFile('day21/test.txt')

const players = []

let dice = 0

inputData.forEach((row, i) => {
  let player = {
    score: 0,
  }
  player.position = parseInt(row.split('starting position: ').pop(), 10)

  players.push(player)
})

let rolls = 0
const roll = () => {
  dice += 3
  rolls += 3
}
const getDiceSum = () => dice + dice - 1 + dice - 2

const play = () => {
  let isFirstPlayerPlays = true

  while (true) {
    roll()
    let diceSum = getDiceSum()

    let player = isFirstPlayerPlays ? players[0] : players[1]

    while (diceSum > 0) {
      if (player.position <= 10) {
        player.position++
      }
      if (player.position === 11) {
        player.position = 1
      }
      diceSum--
    }
    player.score += player.position

    if (player.score >= 1000) break
    isFirstPlayerPlays = !isFirstPlayerPlays
  }
}

play()

console.log(players)
console.log({ rolls })
