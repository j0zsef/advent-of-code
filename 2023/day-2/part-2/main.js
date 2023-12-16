const fs = require('fs');
const redHigh = 12;
const greenHigh = 13;
const blueHigh = 14;

function readPuzzleInput(){
    const filePath = '../puzzle-input.txt';
    return fs.readFileSync(filePath, 'utf8').trimEnd();
}

function parsePuzzleInputAndSum(input) {
    const parsedInput = input.split('\n');

    let sum = 0;

    parsedInput.forEach(parsedLine => {
        const gameNumber = findGameNumber(parsedLine);
        if(!findColorScores(parsedLine)){
            sum += gameNumber;
        }
    })

    return sum;
}

function findGameNumber(gameLine) {
    return  parseInt(gameLine.match(/\d+/g)[0]);
}

function findColorScores(gameLine){
    const parsedInput = gameLine.split(':')[1];
    const games = parsedInput.split(';');
    let bust = false;

    games.forEach(game => {
        let redScore = game.match(/(\d+)(?=\s*red)/g) ? parseInt(game.match(/(\d+)(?=\s*red)/g)[0]) : 0;
        let greenScore = game.match(/(\d+)(?=\s*green)/g) ? parseInt(game.match(/(\d+)(?=\s*green)/g)[0]) : 0;
        let blueScore = game.match(/(\d+)(?=\s*blue)/g) ? parseInt(game.match(/(\d+)(?=\s*blue)/g)[0]) : 0;

        if (redScore > redHigh || greenScore > greenHigh || blueScore > blueHigh){
            bust = true;
        }
    })

    return bust;
}

console.log(parsePuzzleInputAndSum(readPuzzleInput()));
