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
  drawTopWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }

  drawRightWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawBottomWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawLeftWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }
  removeWalls(cell1, cell2) {
    let x = cell1.colNum - cell2.colNum;
    if (x === 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x === -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }

    let y = cell1.rowNum - cell2.rowNum;
    if (y === 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y === -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

}

let newMaze = new Maze(300, 20, 10);
newMaze.setup();