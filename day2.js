const read = require('read-file');
const { invert } = require('lodash');

const scoreKey = {
  X: 1, //ROCK
  Y: 2, //PAPER
  Z: 3 //SCISSORS
};

const winKey = {
  X: 'C', //ROCK BEATS SCISSORS
  Y: 'A', //PAPER BEATS ROCK
  Z: 'B' //SCISSORS BEATS PAPER
};

const loseKey = {
  A: 'Z', //ROCK BEATS SCISSORS
  B: 'X', //PAPER BEATS ROCK
  C: 'Y' //SCISSORS BEATS PAPER
};

const equalKey = {
  X: 'A',
  Y: 'B',
  Z: 'C'
};

read('day2input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const games = buffer.split('\n').map(x => x.split(' '));
    let totalScore = 0;
    games.forEach(game => {
      const [opponent, me] = game;
      totalScore += scoreKey[me];
      if (winKey[me] === opponent) {
        totalScore += 6;
      } else if (equalKey[me] === opponent) {
        totalScore += 3;
      }
    });
    console.log(`Part 1 answer: ${totalScore}`);
    const invertWinKey = invert(winKey);
    const invertEqualKey = invert(equalKey);
    let part2score = 0;
    games.forEach(game => {
      const [opponent, me] = game;
      if (me === 'X') {
        const myAnswer = loseKey[opponent];
        part2score += scoreKey[myAnswer];
      } else if (me === 'Y') {
        const myAnswer = invertEqualKey[opponent];
        part2score += 3;
        part2score += scoreKey[myAnswer];
      } else if (me === 'Z') {
        const myAnswer = invertWinKey[opponent];
        part2score += 6;
        part2score += scoreKey[myAnswer];
      }
    });
    console.log(`Part 2 answer: ${part2score}`);
  }
});
