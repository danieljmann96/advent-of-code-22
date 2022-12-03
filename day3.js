const read = require('read-file');
const { intersection } = require('lodash');

function getPriorityScore(letter) {
  if (letter.toLowerCase() === letter) {
    return letter.charCodeAt(0) - 96;
  } else {
    return letter.charCodeAt(0) - 38;
  }
}

read('day3input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const rucksacks = buffer.split('\n');
    let totalScore = 0;
    rucksacks.forEach(rucksack => {
      const compartmentOne = rucksack
        .substring(0, rucksack.length / 2)
        .split('');
      const compartmentTwo = rucksack.substring(rucksack.length / 2).split('');
      const commonItems = intersection(compartmentOne, compartmentTwo);
      commonItems.forEach(item => {
        totalScore += getPriorityScore(item);
      });
    });
    console.log(`Part 1 answer: ${totalScore}`);
    let part2score = 0;
    for (let i = 0; i < rucksacks.length; i += 3) {
      const rucksackOne = rucksacks[i].split('');
      const rucksackTwo = rucksacks[i + 1].split('');
      const rucksackThree = rucksacks[i + 2].split('');
      const badge = intersection(rucksackOne, rucksackTwo, rucksackThree)[0];
      part2score += getPriorityScore(badge);
    }
    console.log(`Part 2 answer: ${part2score}`);
  }
});
