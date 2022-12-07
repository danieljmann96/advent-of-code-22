const { readFileSync } = require('fs');

class File {
  name = '';
  size = 0;

  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

class Directory {
  files = [];
  directories = [];
  location = '';
  parentLocation = '';

  constructor(location, parentLocation) {
    this.location = location;
    this.parentLocation = parentLocation;
  }

  addFile(file) {
    this.files.push(file);
  }
  addDirectory(directory) {
    this.directories.push(directory);
  }
  getSize() {
    const fileSizes = this.files.reduce((acc, file) => acc + file.size, 0);
    const directorySizes = this.directories.reduce(
      (acc, directory) => acc + directory.getSize(),
      0
    );
    return fileSizes + directorySizes;
  }
}

const input = readFileSync('./day7input.txt', 'utf8').split('\n');
const directories = [];
directories.push(new Directory('/', ''));
let currentDirectory = directories[0];
let listingContents = false;
input.slice(1).forEach(line => {
  if (line === '$ ls') {
    listingContents = true;
  } else if (line.includes('$ cd')) {
    listingContents = false;
    const instruction = line.split(' ')[2];
    if (instruction === '..') {
      const directoryToSwitchTo = directories.find(
        directory => directory.location === currentDirectory.parentLocation
      );
      currentDirectory = directoryToSwitchTo;
    } else {
      const directoryToSwitchTo = directories.find(
        directory =>
          directory.location === `${currentDirectory.location}${instruction}/`
      );
      if (directoryToSwitchTo) {
        currentDirectory = directoryToSwitchTo;
      } else {
        const directoryToSwitchTo = new Directory(
          `${currentDirectory.location}${instruction}/`,
          currentDirectory.location
        );
        directories.push(directoryToSwitchTo);
        currentDirectory = directoryToSwitchTo;
      }
    }
  } else if (listingContents) {
    const [size, name] = line.split(' ');
    if (size === 'dir') {
      const newDirectory = new Directory(
        `${currentDirectory.location}${name}/`,
        currentDirectory.location
      );
      currentDirectory.addDirectory(newDirectory);
      directories.push(newDirectory);
    } else {
      currentDirectory.addFile(new File(name, Number(size)));
    }
  }
});

const result = directories.reduce((acc, directory) => {
  return directory.getSize() <= 100000 ? acc + directory.getSize() : acc;
}, 0);

console.log(`Part 1 answer: ${result}`);

const totalSpace = 70000000;
const freeSpace = totalSpace - directories[0].getSize();
const neededSpace = 30000000 - freeSpace;
const part2result = directories
  .filter(directory => directory.getSize() >= neededSpace)
  .map(x => x.getSize())
  .sort((a, b) => a - b)[0];
console.log(`Part 2 answer: ${part2result}`);
