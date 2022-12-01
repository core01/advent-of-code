import {readFile} from "../../utils.js";

const inputData = readFile();

const getFirst = () => {
    let gamma = '';
    let epsilon = '';

    for (let j = 0; j < inputData[0].length; j++) {
        let oneCount = 0;
        let zeroCount = 0;

        for (let i = 0; i < inputData.length; i++) {
            const value = parseInt(inputData[i][j], 10);
            if (value === 1) oneCount++;
            else zeroCount++;
        }

        if (oneCount > zeroCount) {
            gamma += '1';
            epsilon += '0';
        } else {
            gamma += '0';
            epsilon += '1';
        }
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

const getOnlyFromArray = (data, startIndex = 0, isMore = true) => {
    const oneArray = [];
    const zeroArray = [];

    for (let i = 0; i < data.length; i++) {
        if (parseInt(data[i][startIndex], 10)) oneArray.push(data[i])
        else zeroArray.push(data[i])
    }

    if (zeroArray.length > oneArray.length) {
        return isMore ? zeroArray : oneArray;
    } else {
        return isMore ? oneArray : zeroArray;
    }
};

const findRating = (data, isMore = true) => {
    let index = 0;
    let rating;

    do {
        rating = getOnlyFromArray(rating || data, index, isMore);
        index++;
    } while (rating.length > 1)

    return rating.pop();
}

const getSecond = (data = inputData) => {
    const co2Rating = findRating(data, false);
    const oxygenRating = findRating(data);

    return parseInt(oxygenRating, 2) * parseInt(co2Rating, 2);
}

console.log('First: ', getFirst());
console.log('Second:', getSecond());
