export const BOARD_LENGTH = 6;
export const WIN_LENGTH = 3;

export enum TURNS {
  X = "x",
  O = "o",
}

// plus x, y for 1 or minus x, y for 1
// [0, 0] -> [1, 1] -> [2, 2]
export const checkDiagonal = (
  steps: { [key: string]: TURNS },
  move: { x: number; y: number },
  player: TURNS
) => {
  const diagonal = [move];
  let x: number | undefined = move.x - 1;
  let y: number | undefined = move.y - 1;

  // go up -> x - 1, y - 1
  while (x !== undefined && y !== undefined) {
    const value = steps[`${x}-${y}`];
    if (value === player) {
      diagonal.unshift({ x, y });
      x--;
      y--;
    } else {
      x = undefined;
      y = undefined;
    }
  }

  // go down -> x + 1, y + 1
  x = move.x + 1;
  y = move.y + 1;
  while (x !== undefined && y !== undefined) {
    const value = steps[`${x}-${y}`];
    if (value === player) {
      diagonal.push({ x, y });
      x++;
      y++;
    } else {
      x = undefined;
      y = undefined;
    }
  }

  return diagonal.length >= WIN_LENGTH;
};

// plus x, y for 1 or minus x, y for 1
// [0, 0] -> [1, 1] -> [2, 2]
export const checkReverseDiagonal = (
  steps: { [key: string]: TURNS },
  move: { x: number; y: number },
  player: TURNS
) => {
  const diagonal = [move];
  let x: number | undefined = move.x + 1;
  let y: number | undefined = move.y - 1;

  // go up -> x + 1, y - 1
  while (x !== undefined && y !== undefined) {
    const value = steps[`${x}-${y}`];
    if (value === player) {
      diagonal.unshift({ x, y });
      x++;
      y--;
    } else {
      x = undefined;
      y = undefined;
    }
  }

  // go down -> x - 1, y + 1
  x = move.x - 1;
  y = move.y + 1;
  while (x !== undefined && y !== undefined) {
    const value = steps[`${x}-${y}`];
    if (value === player) {
      diagonal.push({ x, y });
      x--;
      y++;
    } else {
      x = undefined;
      y = undefined;
    }
  }

  return diagonal.length >= WIN_LENGTH;
};

export const checkVertical = (
  steps: { [key: string]: TURNS },
  move: { x: number; y: number },
  player: TURNS
) => {
  let vertical = [move];
  let left: number | undefined = move.x - 1;
  let right: number | undefined = move.x + 1;

  // go up -> x - 1
  while (left !== undefined) {
    const value = steps[`${left}-${move.y}`];
    if (value === player) {
      vertical.unshift({ x: left, y: move.y });
      left--;
    } else {
      left = undefined;
    }
  }

  // go down -> x + 1
  while (right !== undefined) {
    const value = steps[`${right}-${move.y}`];
    if (value === player) {
      vertical.unshift({ x: right, y: move.y });
      right++;
    } else {
      right = undefined;
    }
  }

  return vertical.length >= WIN_LENGTH;
};

export const checkHorizontal = (
  steps: { [key: string]: TURNS },
  move: { x: number; y: number },
  player: TURNS
) => {
  const horizontal = [move];
  let head: number | undefined = move.y - 1;
  let tail: number | undefined = move.y + 1;

  // go up -> y - 1
  while (head !== undefined) {
    const up = steps[`${move.x}-${head}`];
    if (up === player) {
      horizontal.unshift({ x: move.x, y: head });
      head--;
    } else {
      head = undefined;
    }
  }

  // go down -> y + 1
  while (tail !== undefined) {
    const down = steps[`${move.x}-${tail}`];
    if (down === player) {
      horizontal.push({ x: move.x, y: tail });
      tail++;
    } else {
      tail = undefined;
    }
  }

  return horizontal.length >= WIN_LENGTH;
};
