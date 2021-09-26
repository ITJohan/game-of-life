const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const size = 3;
const seedFactor = 0.955;
const grid = [];
const rows = 200;
const cols = 400;

const init = () => {
  for (let y = 0; y < rows; y++) {
    const row = [];

    for (let x = 0; x < cols; x++) {
      row.push({ x: x * size, y: y * size, dead: Math.random() < seedFactor ? true : false });
    }

    grid.push(row);
  }
};

const draw = () => {
  // Background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cols * size, rows * size);

  // Grid
  ctx.fillStyle = 'white';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let liveNeighbours = 0;
      if (y > 0 && y < rows - 1 && x > 0 && x < cols - 1) {
        !grid[y - 1][x - 1].dead && liveNeighbours++  
        !grid[y - 1][x].dead && liveNeighbours++  
        !grid[y - 1][x + 1].dead && liveNeighbours++  
        !grid[y][x - 1].dead && liveNeighbours++  
        !grid[y][x + 1].dead && liveNeighbours++  
        !grid[y + 1][x - 1].dead && liveNeighbours++  
        !grid[y + 1][x].dead && liveNeighbours++  
        !grid[y + 1][x + 1].dead && liveNeighbours++  
      }

      if (!grid[y][x].dead && (liveNeighbours === 2 || liveNeighbours === 3)) {
        // Any live cell with two or three live neighbours survives.
        !grid[y][x].dead && ctx.fillRect(grid[y][x].x, grid[y][x].y, size, size);
        continue;
      } else if (grid[y][x].dead && liveNeighbours === 3) {
        // Any dead cell with three live neighbours becomes a live cell.
        grid[y][x].dead = false;
      } else {
        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.  
        grid[y][x].dead = true;
      }

      !grid[y][x].dead && ctx.fillRect(grid[y][x].x, grid[y][x].y, size, size);
    }
  }
};

const loop = async (timestamp) => {
  draw();

  window.requestAnimationFrame(loop);
};


init();
window.requestAnimationFrame(loop);