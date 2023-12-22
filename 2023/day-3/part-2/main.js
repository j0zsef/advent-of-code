const fs = require('fs');

function readPuzzleInput(){
    const filePath = '../puzzle-input.txt';
    return fs.readFileSync(filePath, 'utf8').trimEnd();
}

function parsePuzzleInputAndSum(input) {
    const parsedInput = input.split('\n');
    let sum = 0;
    for (let i = 0; i < parsedInput.length; i++) {
        for (let j = 0; j < parsedInput[i].length; j++) {
            let gearRatios = [];
            if (parsedInput[i][j] !== "*") {
                continue;
            }
            let rowBefore = searchInRowBefore(parsedInput, i , j);
            if (rowBefore > 0){
                gearRatios.push(rowBefore);
            }
            let rowAfter = searchInRowAfter(parsedInput, i , j);
            if (rowAfter > 0){
                gearRatios.push(rowAfter);
            }
            let above = searchAboveRow(parsedInput, i, j);
            if (above.length > 0){
                gearRatios.push(...above);
            }
            let below= searchBelowRow(parsedInput, i, j)
            if (below.length > 0){
                gearRatios.push(...below);
            }
            if (gearRatios.length === 2){
                sum += gearRatios.reduce((acc, currentValue) => acc * currentValue, 1);
            }
        }
    }

    return sum;
}

function findNextOccurrenceOfSymbol(str, startPosition) {
    for (let i = startPosition; i <= str.length; i++) {
        if (isNaN(parseInt(str[i]))) {
            return i;
        }
    }
    return -1;
}

function findPreviousOccurrenceOfSymbol(str, startPosition) {
    for (let i = startPosition; i >= 0; i--) {
        if (isNaN(parseInt(str[i]))) {
            return i;
        }
    }
    return -1;
}

function removeFromBothSides(input, currentIndex){
    let nextSymbol = findNextOccurrenceOfSymbol(input, currentIndex);
    let previousSymbol = findPreviousOccurrenceOfSymbol(input, currentIndex);
    if (nextSymbol === -1) {
        return parseInt(input.slice(previousSymbol, input.length));
    } else if (previousSymbol === -1) {
        return parseInt(input.slice(0,nextSymbol));
    } else {
        return parseInt(input.slice(previousSymbol+1, nextSymbol));
    }
}

function searchInRowBefore(input, i, j){
    //search before
    if (!isNaN(parseInt(input[i][j-1]))){
        return removeFromBothSides(input[i], j-1);
    }

    return 0;
}

function searchInRowAfter(input, i, j){
    //search after
    if (!isNaN(parseInt(input[i][j+1]))){
        return removeFromBothSides(input[i], j+1);
    }

    return 0;
}

function searchAboveRow(input, i, j){
    let aboveValues = [];
    if (i === 0) {
        return aboveValues
    }
    //if above
    if (!isNaN(parseInt(input[i-1][j]))){
        return [removeFromBothSides(input[i-1], j)];
    }
    //if above to left
    if (!isNaN(parseInt(input[i-1][j-1]))){
        aboveValues.push(removeFromBothSides(input[i-1], j-1));
    }
    //if above to right
    if (!isNaN(parseInt(input[i-1][j+1]))){
        aboveValues.push(removeFromBothSides(input[i-1], j+1))
    }

    return aboveValues;
}

function searchBelowRow(input, i, j){
    let belowValues = [];
    if (i === input.length-1) {
        return belowValues;
    }
    //if below
    if (!isNaN(parseInt(input[i+1][j]))){
        return [removeFromBothSides(input[i+1], j)];
    }

    //if below to left
    if (!isNaN(parseInt(input[i+1][j-1]))){
        belowValues.push(removeFromBothSides(input[i+1], j-1));
    }

    //if below to right
    if (!isNaN(parseInt(input[i+1][j+1]))) {
        belowValues.push(removeFromBothSides(input[i+1], j+1));
    }

    return belowValues;
}

console.log(parsePuzzleInputAndSum(readPuzzleInput()));
