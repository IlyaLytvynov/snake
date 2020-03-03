export const getCellColor = col => {
  let color = 'white';
  if (col % 2 === 0) {
    color = 'white';
  }
  return color;
};

export const normalizeScore = score => {
  if (score < 10) {
    return `00${score}`;
  }
  if (score < 100) {
    return `0${score}`;
  }
  return `${score}`;
};

export const sizeGenerator = ({ width, height, scale }) => {
  const CELL_COUNT = 16;
  const cellSize = Math.floor(width / CELL_COUNT);
  const adjustedWidth = cellSize * CELL_COUNT;
  const adjustedHeight = Math.floor(height / cellSize) * cellSize;
  return {
    cellSize,
    height: adjustedHeight,
    width: adjustedWidth,
    scale
  };
};
