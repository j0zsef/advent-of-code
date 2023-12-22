const fs = require('fs');

function readPuzzleInput(){
    const filePath = '../puzzle-input.txt';
    return fs.readFileSync(filePath, 'utf8').trimEnd();
}

function parsePuzzleInputAndSum(input) {
    const parsedInput = input.split('\n');
    let sum = 0;

    for (let i = 0; i < parsedInput.length; i++) {
        let partNumbers = [];
        let push = true;
        for (let j = 0; j < parsedInput[i].length; j++) {
            if (isNaN(parseInt(parsedInput[i][j]))) {
                push = true;
                continue;
            }
            if (push) {
                let temp = searchInRow(parsedInput, i , j);
                temp += searchAboveRow(parsedInput, i, j);
                temp += searchBelowRow(parsedInput, i, j)
                if (temp > 0){
                    partNumbers.push(temp);
                    push = false;
                }
            }
        }

        if (partNumbers.length > 0){
            sum += partNumbers.reduce((acc, currentValue) => acc + currentValue);
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

function searchInRow(input, i, j){
    //search before number
    if (j > 0 && input[i][j-1] !== "." && isNaN(parseInt(input[i][j-1]))){
        return removeFromBothSides(input[i], j);
    }
    //search after number
    if (input[i][j+1] !== "." && isNaN(parseInt(input[i][j+1]))){
        return removeFromBothSides(input[i], j);
    }

    return 0;
}

function searchAboveRow(input, i, j){
    if (i === 0) {
        return 0
    }

    //if symbol above to left
    if (j > 0 && input[i-1][j-1] !== "." && isNaN(parseInt(input[i-1][j-1]))){
        return removeFromBothSides(input[i], j);
    }
    //if symbol above numbers
    if (input[i-1][j] !== "." && isNaN(parseInt(input[i-1][j]))){
        return removeFromBothSides(input[i], j);
    }
    //if symbol above to right
    if (input[i-1][j+1] !== "." && isNaN(parseInt(input[i-1][j+1]))){
        return removeFromBothSides(input[i], j);
    }

    return 0;
}

function searchBelowRow(input, i, j){
    if (i === input.length-1) {
        return 0
    }

    //if symbol below to left
    if (j > 0 && input[i+1][j-1] !== "." && isNaN(parseInt(input[i+1][j-1]))){
        return removeFromBothSides(input[i], j);
    }
    //if symbol below numbers
    if (input[i+1][j] !== "." && isNaN(parseInt(input[i+1][j]))){
        return removeFromBothSides(input[i], j);
    }
    //if symbol below to right
    if (input[i+1][j+1] !== "." && isNaN(parseInt(input[i+1][j+1]))) {
        return removeFromBothSides(input[i], j);
    }

    return 0;
}

console.log(parsePuzzleInputAndSum(readPuzzleInput()));
