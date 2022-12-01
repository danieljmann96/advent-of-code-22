const read = require('read-file');

class Elf {
  totalCalories = 0;
  addToCalories = calories => {
    this.totalCalories += calories;
  };
}

read('day1input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const values = buffer.split('\n').map(x => (x.length > 0 ? Number(x) : x));
    const elves = [];
    let currentElf = new Elf();
    while (values.length > 0) {
      const value = values[0];
      if (value === '') {
        elves.push(currentElf);
        currentElf = new Elf();
        values.shift();
      } else {
        currentElf.addToCalories(value);
        values.shift();
      }
    }
    console.log(
      `Part 1 answer: ${
        elves.sort((a, b) => b.totalCalories - a.totalCalories)[0].totalCalories
      }`
    );
    console.log(
      `Part 2 answer: ${elves
        .sort((a, b) => b.totalCalories - a.totalCalories)
        .splice(0, 3)
        .reduce((a, b) => a + b.totalCalories, 0)}`
    );
  }
});
