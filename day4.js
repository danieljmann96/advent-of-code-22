const read = require('read-file');
const { inRange } = require('lodash');

read('day4input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const input = buffer
      .split('\n')
      .map(line => line.split(',').map(x => x.split('-').map(Number)));
    let totalScore = 0;
    input.forEach(ranges => {
      if (
        (ranges[0][0] <= ranges[1][0] && ranges[0][1] >= ranges[1][1]) ||
        (ranges[1][0] <= ranges[0][0] && ranges[1][1] >= ranges[0][1])
      ) {
        totalScore += 1;
      }
    });
    console.log(`Part 1 answer: ${totalScore}`);
    let part2score = 0;
    input.forEach(ranges => {
      if (
        inRange(ranges[0][0], ranges[1][0], ranges[1][1] + 1) ||
        inRange(ranges[0][1], ranges[1][0], ranges[1][1] + 1) ||
        inRange(ranges[1][0], ranges[0][0], ranges[0][1] + 1) ||
        inRange(ranges[1][1], ranges[0][0], ranges[0][1] + 1)
      ) {
        part2score += 1;
      }
    });
    console.log(`Part 2 answer: ${part2score}`);
  }
});
