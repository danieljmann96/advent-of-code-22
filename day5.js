const read = require('read-file');

class Stack {
  crates = [];
  setCrates(crates) {
    this.crates = crates;
  }
  addCrate(crate) {
    this.crates.push(crate);
  }
  removeTopCrate() {
    return this.crates.pop();
  }
  addMultipleCrates(crates) {
    const cratesToAdd = crates;
    cratesToAdd.reverse();
    crates.forEach(crate => this.addCrate(crate));
  }
}

function createStacks(input) {
  let stacks = [];
  const lines = input
    .slice(0, 8)
    .map(line => [
      line[1],
      line[5],
      line[9],
      line[13],
      line[17],
      line[21],
      line[25],
      line[29],
      line[33]
    ]);
  for (let i = 0; i < 9; i++) {
    const newStack = new Stack();
    const crates = lines
      .map(line => line[i])
      .reverse()
      .filter(x => x !== ' ');
    newStack.setCrates(crates);
    stacks.push(newStack);
  }
  return stacks;
}

read('day5input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const input = buffer.split('\n');
    const stacks = createStacks(input);
    const instructions = input.slice(10).map(x => {
      const split = x.split(' ');
      return {
        numberToMove: Number(split[1]),
        moveFrom: Number(split[3]),
        moveTo: Number(split[5])
      };
    });
    instructions.forEach(instruction => {
      const stackToMoveFrom = stacks[instruction.moveFrom - 1];
      const stackToMoveTo = stacks[instruction.moveTo - 1];
      for (let i = 0; i < instruction.numberToMove; i++) {
        stackToMoveTo.addCrate(stackToMoveFrom.removeTopCrate());
      }
    });
    const result = stacks.map(x => x.crates[x.crates.length - 1]).join('');
    console.log(`Part 1 answer: ${result}`);
    const part2stacks = createStacks(input);
    instructions.forEach(instruction => {
      const stackToMoveFrom = part2stacks[instruction.moveFrom - 1];
      const stackToMoveTo = part2stacks[instruction.moveTo - 1];
      const cratesToMove = [];
      for (let i = 0; i < instruction.numberToMove; i++) {
        cratesToMove.push(stackToMoveFrom.removeTopCrate());
      }
      stackToMoveTo.addMultipleCrates(cratesToMove);
    });
    const result2 = part2stacks
      .map(x => x.crates[x.crates.length - 1])
      .join('');
    console.log(`Part 2 answer: ${result2}`);
  }
});
