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
