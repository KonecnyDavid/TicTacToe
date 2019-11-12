const requiredToWin = 5;

const chechDirection = (x, y, board, directionPair, isCircle, borders) => {
  let direct = 1;

  const oldX = x;
  const oldY = y;

  for (let i = 0; i <= 1; i++) {
    let found_next = false;
    x = oldX;
    y = oldY;

    y += directionPair[i][0];
    x += directionPair[i][1];

    while (
      !found_next &&
      y >= borders.topMin &&
      x >= borders.leftMin &&
      y < borders.bottomMin &&
      x < borders.rightMin
    ) {
      let current = board[y][x];

      if (current === isCircle) {
        direct += 1;
      } else {
        found_next = true;
      }

      y += directionPair[i][0];
      x += directionPair[i][1];
    }
  }

  if (direct >= requiredToWin) {
    return true;
  }

  return false;
};

const checkWin = (board, x, y, isCircle) => {
  const boardSize = board.length;
  const borders = {
    leftMin: Math.max(0, x - requiredToWin),
    rightMin: Math.min(boardSize, x + requiredToWin),
    topMin: Math.max(0, y - requiredToWin),
    bottomMin: Math.min(boardSize, y + requiredToWin)
  };

  const directions = [
    [
      [1, 1],
      [-1, -1]
    ],
    [
      [-1, 1],
      [1, -1]
    ],
    [
      [0, -1],
      [0, 1]
    ],
    [
      [-1, 0],
      [1, 0]
    ]
  ];

  let res = false;

  directions.forEach(directionPair => {
    let is_win = chechDirection(x, y, board, directionPair, isCircle, borders);

    if (is_win) {
      res = true;
    }
  });

  return res;

};
export default checkWin;
