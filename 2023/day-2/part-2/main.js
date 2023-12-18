const fs = require('fs');

function readPuzzleInput(){
    const filePath = '../puzzle-input.txt';
    return fs.readFileSync(filePath, 'utf8').trimEnd();
}

function parsePuzzleInputAndSum(input) {
    const parsedInput = input.split('\n');

    let sum = 0;

    parsedInput.forEach(parsedLine => {
        sum += findColorPowerScore(parsedLine);
    })

    return sum;
}

function findColorPowerScore(gameLine){
    const parsedInput = gameLine.split(':')[1];
    const games = parsedInput.split(';');
    let redHigh = 0;
    let greenHigh = 0;
    let blueHigh = 0;

    games.forEach(game => {
        let redScore = game.match(/(\d+)(?=\s*red)/g) ? parseInt(game.match(/(\d+)(?=\s*red)/g)[0]) : 0;
        let greenScore = game.match(/(\d+)(?=\s*green)/g) ? parseInt(game.match(/(\d+)(?=\s*green)/g)[0]) : 0;
        let blueScore = game.match(/(\d+)(?=\s*blue)/g) ? parseInt(game.match(/(\d+)(?=\s*blue)/g)[0]) : 0;

        if (redScore >= redHigh){
            redHigh = redScore;
        }
        if (greenScore >= greenHigh){
            greenHigh = greenScore;
        }
        if (blueScore > blueHigh){
            blueHigh =  blueScore
        }
    })

    return redHigh * greenHigh * blueHigh;
}

console.log(parsePuzzleInputAndSum(readPuzzleInput()));
