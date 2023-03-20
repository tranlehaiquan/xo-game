import clsx from "clsx";
import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";
const BOARD_LENGTH = 6;
const WIN_LENGTH = 3;

enum TURNS {
  X = "x",
  O = "o",
}

// plus x, y for 1 or minus x, y for 1
// [0, 0] -> [1, 1] -> [2, 2]
const checkDiagonal = (
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
const checkReverseDiagonal = (
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

const checkVertical = (
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

const checkHorizontal = (
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

function App() {
  const [steps, setSteps] = useState<{ [key: string]: TURNS }>({});
  const [turn, setTurn] = useState<TURNS>(TURNS.X);
  const [win, setWin] = useState<TURNS | null>(null);

  const handleClick = (x: number, y: number) => {
    if (steps[`${x}-${y}`] || win) return;
    setSteps({ ...steps, [`${x}-${y}`]: turn });
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);

    // checkWin(x, y);
    const a = checkHorizontal(steps, { x, y }, turn);
    const b = checkVertical(steps, { x, y }, turn);
    const c = checkDiagonal(steps, { x, y }, turn);
    const d = checkReverseDiagonal(steps, { x, y }, turn);

    if (a || b || c || d) {
      setWin(turn);
      alert(`${turn} win`);
    }
  };

  const reset = () => {
    setSteps({});
    setTurn(TURNS.X);
    setWin(null);
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl text-center">Tic Tac Toe</h1>
        <h2 className="text-2xl text-center">Turn: {turn}</h2>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="inline-flex border">
        {[...new Array(BOARD_LENGTH)].map((_, x) => (
          <div key={x} className="border-black">
            {[...new Array(BOARD_LENGTH)].map((_, y) => (
              <Cell
                key={`${x}-${y}`}
                className={clsx(
                  'hover:bg-slate-200 transition-all duration-200',
                  steps[`${x}-${y}`] === TURNS.X ? "bg-red-500 hover:bg-red-500" : "",
                  steps[`${x}-${y}`] === TURNS.O ? "bg-blue-500 hover:bg-blue-500" : ""
                )}
                onClick={() => handleClick(x, y)}
              >
                <span className="text-3xl">{steps[`${x}-${y}`]}</span>
              </Cell>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
