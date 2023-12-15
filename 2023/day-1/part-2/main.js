const fs = require('fs');

function readPuzzleInput(){
    const filePath = '../puzzle-input.txt';
    return fs.readFileSync(filePath, 'utf8').trimEnd();
}

function parsePuzzleInputAndSum(input) {
    let parsedInput = input.split('\n');
    let sum = 0;

    parsedInput.forEach(parsedLine => {
        const {first, last} = findFirstAndLastIntegers(parsedLine);
        const combined = parseInt(`${first}${last}`);
        sum += combined;
    })

    return sum;
}

function findFirstAndLastIntegers(str) {
    const matches = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    let lowIndex = str.length;
    let lowMatch = 0;
    let highIndex = 0;
    let highMatch = 0;

    matches.forEach(match => {
        let low = str.indexOf(match);
        let high = str.lastIndexOf(match);
        if (low === -1) {
            return;
        }

        if (low <= lowIndex){
            lowIndex = low;
            lowMatch = match;
        }

        if (high >= highIndex){
            highIndex = high;
            highMatch = match;
        }
    })


    if (!matches) {
        return null;
    }

    const lowInteger = parseNumberText(lowMatch);
    const highInteger = parseNumberText(highMatch);

    return { first: lowInteger, last: highInteger };
}

function parseNumberText(text){
    if (isNaN(parseInt(text))){
        switch (text) {
            case "one":
                return 1
            case "two":
                return 2
            case "three":
                return 3
            case "four":
                return 4
            case "five":
                return 5
            case "six":
                return 6
            case "seven":
                return 7
            case "eight":
                return 8
            case "nine":
                return 9
            default:
                return 0
        }
    }

    return parseInt(text);
}

console.log(parsePuzzleInputAndSum(readPuzzleInput()));
