const { readFileSync } = require('fs');

const input = readFileSync('./day8input.txt', 'utf8')
  .split('\n')
  .map(x => x.split('').map(y => Number(y)));

let visibleTrees = 0;

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (
      x === 0 ||
      y === 0 ||
      x === input[y].length - 1 ||
      y === input.length - 1
    ) {
      visibleTrees++;
    } else {
      const currentTree = input[y][x];
      const leftTrees = input[y].slice(0, x);
      const rightTrees = input[y].slice(x + 1);
      const topTrees = input.map(line => line[x]).filter((line, i) => i < y);
      const bottomTrees = input.map(line => line[x]).filter((line, i) => i > y);
      if (
        leftTrees.every(tree => tree < currentTree) ||
        rightTrees.every(tree => tree < currentTree) ||
        topTrees.every(tree => tree < currentTree) ||
        bottomTrees.every(tree => tree < currentTree)
      ) {
        visibleTrees++;
      }
    }
  }
}

console.log(`Part 1 answer: ${visibleTrees}`);

let highestScenicScore = 0;

function getVisibleTrees(currentTree, trees) {
  let score = 0;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i] < currentTree) {
      score++;
    } else {
      score++;
      return score;
    }
  }
  return score;
}

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    const currentTree = input[y][x];
    if (
      x === 0 ||
      y === 0 ||
      x === input[y].length - 1 ||
      y === input.length - 1
    ) {
      continue;
    }
    const leftTrees = input[y].slice(0, x).reverse();
    const rightTrees = input[y].slice(x + 1);
    const topTrees = input
      .map(line => line[x])
      .filter((line, i) => i < y)
      .reverse();
    const bottomTrees = input.map(line => line[x]).filter((line, i) => i > y);
    const leftVisibleTrees = getVisibleTrees(currentTree, leftTrees);
    const rightVisibleTrees = getVisibleTrees(currentTree, rightTrees);
    const topVisibleTrees = getVisibleTrees(currentTree, topTrees);
    const bottomVisibleTrees = getVisibleTrees(currentTree, bottomTrees);
    const score =
      leftVisibleTrees *
      rightVisibleTrees *
      topVisibleTrees *
      bottomVisibleTrees;
    if (score > highestScenicScore) {
      highestScenicScore = score;
    }
  }
}

console.log(`Part 2 answer: ${highestScenicScore}`);
