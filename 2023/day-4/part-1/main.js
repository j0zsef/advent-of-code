const fs = require('fs');

function readPuzzleInput(){
    const filePath = '../puzzle-input.txt';
    return fs.readFileSync(filePath, 'utf8').trimEnd();
}

function parsePuzzleInputAndSum(input) {
    const parsedInput = input.split('\n');
    const winningNumbers = [];
    const pickedNumbers = [];
    let sum = 0;

    for (let i = 0; i < parsedInput.length; i++) {
        let splitCard = parsedInput[i].split('|');
        pickedNumbers.push(splitCard[1].match(/\d+/g));
        winningNumbers.push(splitCard[0].split(':')[1].match(/\d+/g));
    }

    for (let i = 0; i < winningNumbers.length; i++) {
        let winCount = 0;
        for (let j = 0; j < winningNumbers[i].length; j++) {
            if(pickedNumbers[i].indexOf(winningNumbers[i][j]) !== -1){
                if (winCount == 0){
                    winCount++;
                }else {
                    winCount *= 2;
                }
            }
        }
        sum += winCount;
    }

    return sum;
}

console.log(parsePuzzleInputAndSum(readPuzzleInput()));
