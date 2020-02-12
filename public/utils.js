export const getCellColor = col => {
  let color = 'yellow';
  if (col % 2 === 0) {
    color = 'green';
  }
  return color;
};
