const read = require('read-file');

read('day6input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const input = buffer.split('');
    let result = 0;
    for (let i = 0; i < input.length; i++) {
      if (
        new Set([input[i], input[i + 1], input[i + 2], input[i + 3]]).size === 4
      ) {
        result = i + 4;
        break;
      }
    }
    console.log(`Part 1 answer: ${result}`);
    let part2result = 0;
    for (let i = 0; i < input.length; i++) {
      const arrayToTest = [];
      for (let j = 0; j < 14; j++) {
        arrayToTest.push(input[i + j]);
      }
      if (new Set(arrayToTest).size === 14) {
        part2result = i + 14;
        break;
      }
    }
    console.log(`Part 2 answer: ${part2result}`);
  }
});
