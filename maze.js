let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");
let generationComplete = false;

let current;

class Maze {
  constructor(size, rows, columns) {
    this.size = size;
    this.columns = columns;
    this.rows = rows;
    this.grid = [];
    this.stack = [];
  }

  setup() {
    for (let row = 0; row < this.rows; row++) {
      let rowLine = [];
      for (let column = 0; column < this.columns; column++) {
        let cell = new Cell(row, column, this.grid, this.size);
        rowLine.push(cell);
      }
      this.grid.push(rowLine);
    }
    current = this.grid[0][0];
    this.grid[this.rows - 1][this.columns - 1].goal = true;
  }
}

class Cell {
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
    this.goal = false;
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
  }
}

let newMaze = new Maze(300, 20, 10);
newMaze.setup();