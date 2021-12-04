import {readFile} from "../utils.js";

const prepareBoards = (initialData) => {
    const BOARD_SIZE = 5;
    let endIndex = 5;
    let startIndex = 0;
    const boardArray = [];
    initialData.forEach((el, index) => {
        if (index === startIndex) {
            boardArray.push(initialData.slice(startIndex, endIndex).map(el => el.split(' ').filter(Boolean)));
            endIndex += BOARD_SIZE;
            startIndex += BOARD_SIZE;
        }
    })

    return boardArray;
}

const initialData = readFile();
const row = initialData.shift().split(',');
const boardArray = prepareBoards(initialData);

const findWinnerBoard = (row, boardArray) => {
    let steps = [];

    for (let rowItem of row) {
        steps.push(rowItem);
        for (let board of boardArray) {
            const boardColumns = board.map((row, i) => board.map(r => r[i]));
            const isBoardHasMatchedRow = board.some(row => row.every(item => steps.includes(item)));
            const isBoardHasMatchedColumn = boardColumns.some(col => col.every(item => steps.includes(item)));

            if (isBoardHasMatchedColumn || isBoardHasMatchedRow) {
                return {winner: rowItem, steps, board};
            }
        }
    }
}

const findLastWinningBoard = (row, boards) => {
    const boardArray = [...boards];
    let steps = [];
    for (let rowItem of row) {
        if (!boardArray.length) {
            break;
        }

        steps.push(rowItem);

        for (let board of boardArray) {
            const boardColumns = board.map((row, i) => board.map(r => r[i]));

            const isBoardHasMatchedRow = board.some(row => row.every(item => steps.includes(item)));
            const isBoardHasMatchedColumn = boardColumns.some(col => col.every(item => steps.includes(item)));

            if (isBoardHasMatchedColumn || isBoardHasMatchedRow) {
                const [winningBoard] = boardArray.splice(boardArray.findIndex(el => el === board), 1);

                if (!boardArray.length) {
                    return {winner: rowItem, steps, board: winningBoard};
                }
            }
        }
    }
}

const getSumOfUnmarkedNumbers = (steps, board) => board.flat().filter(el => !steps.includes(el)).reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0)

const getFirst = () => {
    const {winner, steps, board} = findWinnerBoard(row, boardArray);
    const sumOfUnmarkedNumbers = getSumOfUnmarkedNumbers(steps, board);
    return winner * sumOfUnmarkedNumbers;
}

const getSecond = () => {
    const {winner, steps, board} = findLastWinningBoard(row, boardArray)
    const sumOfUnmarkedNumbers = getSumOfUnmarkedNumbers(steps, board)
    return winner * sumOfUnmarkedNumbers;
}
console.log('First:', getFirst());
console.log('Second:', getSecond());