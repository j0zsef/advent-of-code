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
    const matches = str.match(/\d/g);

    if (!matches) {
        return null;
    }

    const firstInteger = parseInt(matches[0]);
    const lastInteger = parseInt(matches[matches.length - 1]);

    return { first: firstInteger, last: lastInteger };
}



console.log(parsePuzzleInputAndSum(readPuzzleInput()));
