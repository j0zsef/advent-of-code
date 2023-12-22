//read the problem wrong this whole time lol
//this one sums all the values not touching a symbol ¯\_(ツ)_/¯

const fs = require('fs');

function readPuzzleInput(){
    const filePath = '../puzzle-input.txt';
    return fs.readFileSync(filePath, 'utf8').trimEnd();
}

function parsePuzzleInputAndSum(input) {
    const parsedInput = input.split('\n');
    const inputLength = parsedInput.length;

    let sum = 0;

    for (let i = 0; i < inputLength; i++) {
        let partNumbers = [];
        let filteredInput = parsedInput[i];
        if (i === 0) {
            //search in row and below
            for (let j = 0; j < filteredInput.length; j++) {
                if (isNaN(parseInt(filteredInput[j]))) {
                    continue;
                }
                filteredInput = searchInRow(filteredInput, parsedInput, i , j);
                filteredInput = searchBelowRow(filteredInput, parsedInput, i, j);
            }
            //regex all numbers from filteredInputs and add to part numbers
            partNumbers = filteredInput.match(/\d+/g);
        } else if(i === inputLength - 1) {
            //search in row and above
            for (let j = 0; j < parsedInput[i].length; j++) {
                if (isNaN(parseInt(filteredInput[j]))) {
                    continue;
                }
                filteredInput = searchInRow(filteredInput, parsedInput, i , j);
                filteredInput = searchAboveRow(filteredInput, parsedInput, i, j);
            }

            //regex all numbers from filteredInputs and add to part numbers
            partNumbers = filteredInput.match(/\d+/g);
        } else {
            //search above, in row, and below
            for (let j = 0; j < parsedInput[i].length; j++) {
                if (isNaN(parseInt(filteredInput[j]))) {
                    continue;
                }

                filteredInput = searchInRow(filteredInput, parsedInput, i , j);
                filteredInput = searchAboveRow(filteredInput, parsedInput, i, j);
                filteredInput = searchBelowRow(filteredInput, parsedInput, i, j);
            }
            //regex all numbers from filteredInputs and add to part numbers
            partNumbers = filteredInput.match(/\d+/g);
        }

        if (partNumbers){
            sum += parseInt(partNumbers.reduce((acc, currentValue) => parseInt(acc) + parseInt(currentValue)));
        }
    }

    return sum;
}

function findNextOccurrenceOfSymbol(str, startPosition) {
    for (let i = startPosition; i >= 0; i++) {
        if (isNaN(parseInt(str[i]))) {
            return i;
        }
    }
    return -1; // Return -1 if not found
}

function findPreviousOccurrenceOfSymbol(str, startPosition) {
    for (let i = startPosition; i >= 0; i--) {
        if (isNaN(parseInt(str[i]))) {
            return i;
        }
    }
    return -1; // Return -1 if not found
}

function removeFromBothSides(filteredInput, currentIndex){
    let nextSymbol = findNextOccurrenceOfSymbol(filteredInput, currentIndex);
    let previousSymbol = findPreviousOccurrenceOfSymbol(filteredInput, currentIndex);
    if (nextSymbol === -1) {
        filteredInput = filteredInput.slice(0, currentIndex);
    } else if (previousSymbol === -1) {
        filteredInput = '*'.repeat(currentIndex) + filteredInput.slice(j, filteredInput.length);
    } else {
        filteredInput = filteredInput.slice(0, previousSymbol+1) + '*'.repeat(nextSymbol-previousSymbol-1) + filteredInput.slice(nextSymbol, filteredInput.length);
    }

    return filteredInput;
}

function searchInRow(filteredInput, parsedInput, i, j){
    //if symbol is behind numbers then remove numbers between .
    //.123*
    if (!isNaN(parseInt(filteredInput[j])) && filteredInput[j+1] !== "." && isNaN(parseInt(filteredInput[j+1]))){
        let previousPeriod = findPreviousOccurrenceOfSymbol(filteredInput, j);
        if (previousPeriod === -1){
            filteredInput = filteredInput.slice(j+1, filteredInput.length);
        }else{
            filteredInput = filteredInput.slice(0, previousPeriod+1) + '*'.repeat(j-previousPeriod) + filteredInput.slice(j+1, filteredInput.length);
        }
        return filteredInput;
    }

    //if symbol next to numbers then replace the numbers between .
    if (!isNaN(parseInt(filteredInput[j])) && filteredInput[j-1] !== "." && isNaN(parseInt(filteredInput[j-1]))){
        // remove numbers from filteredInput on j+1 index until .
        let nextPeriod = findNextOccurrenceOfSymbol(filteredInput, j);
        if (nextPeriod === -1){
            filteredInput = filteredInput.slice(0, j-1);
        }else{
            filteredInput = filteredInput.slice(0, j) + '*'.repeat(nextPeriod-j) + filteredInput.slice(nextPeriod, filteredInput.length);
        }
        return filteredInput;
    }

    return filteredInput;
}

function searchAboveRow(filteredInput, parsedInput, i, j){
    //if symbol above to left of numbers then remove numbers
    if (!isNaN(parseInt(filteredInput[j])) && parsedInput[i-1][j-1] !== "." && isNaN(parseInt(parsedInput[i-1][j-1]))){
        // remove numbers from filteredInput on j+1 index until . or symbol
        let nextPeriod = findNextOccurrenceOfSymbol(filteredInput, j);
        if (nextPeriod === -1){
            filteredInput = filteredInput.slice(0, j);
        }else{
            filteredInput = filteredInput.slice(0, j) + '*'.repeat(nextPeriod-j) + filteredInput.slice(nextPeriod, filteredInput.length);
        }
        return filteredInput;
    }

    //if symbol above numbers then remove numbers on both sides
    if (!isNaN(parseInt(filteredInput[j])) && parsedInput[i-1][j] !== "." && isNaN(parseInt(parsedInput[i-1][j]))){
        return removeFromBothSides(filteredInput, j);
    }
    //if symbol above to right of numbers then remove numbers
    if (!isNaN(parseInt(filteredInput[j])) && parsedInput[i-1][j+1] !== "." && isNaN(parseInt(parsedInput[i-1][j+1]))){
        return removeFromBothSides(filteredInput, j);
    }

    return filteredInput;
}

function searchBelowRow(filteredInput, parsedInput, i, j){
    //if symbol below to left of numbers then remove numbers
    if (!isNaN(parseInt(filteredInput[j])) && parsedInput[i+1][j-1] !== "." && isNaN(parseInt(parsedInput[i+1][j-1]))){
        // remove numbers from filteredInput on j+1 index until . or symbol
        let nextPeriod = findNextOccurrenceOfSymbol(filteredInput, j);
        if (nextPeriod === -1){
            filteredInput = filteredInput.slice(0, j);
        }else{
            filteredInput = filteredInput.slice(0, j) + '*'.repeat(nextPeriod-j) + filteredInput.slice(nextPeriod, filteredInput.length);
        }
        return filteredInput;
    }
    //if symbol below numbers then remove numbers on both sides
    if (!isNaN(parseInt(filteredInput[j])) && parsedInput[i+1][j] !== "." && isNaN(parseInt(parsedInput[i+1][j]))){
        return removeFromBothSides(filteredInput, j);
    }
    //if symbol below to right of numbers then remove numbers
    if (!isNaN(parseInt(filteredInput[j])) && parsedInput[i+1][j+1] !== "." && isNaN(parseInt(parsedInput[i+1][j+1]))) {
        return removeFromBothSides(filteredInput, j);
    }

    return filteredInput;
}

console.log(parsePuzzleInputAndSum(readPuzzleInput()));
