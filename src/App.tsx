import clsx from "clsx";
import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";
const BOARD_LENGTH = 4;
const WIN_LENGTH = 4;

enum TURNS {
  X = "x",
  O = "o",
}

// plus x, y for 1 or minus x, y for 1
// [0, 0] -> [1, 1] -> [2, 2]
const getDiagonal = (x: number, y: number) => {
  let diagonal = [];
  
  if (x > y) {
    diagonal.push([x - y, 0]);
  }

  return diagonal;
}

const getVertical = (x: number, y: number) => {
  let vertical = [];
  for (let i = 0; i < BOARD_LENGTH; i++) {
    vertical.push([x + i, y]);
  } 
  return vertical;
}

const getHorizontal = (x: number, y: number) => {
  let horizontal = [];
  for (let i = 0; i < BOARD_LENGTH; i++) {
    horizontal.push([x, y + i]);
  }
  return horizontal;
}

function App() {
  const [steps, setSteps] = useState<{ [key: string]: TURNS }>({});
  const [turn, setTurn] = useState<TURNS>(TURNS.X);

  const checkWin = (x: number, y: number) => {
    let win = false;
    // [x, y]
    
    // check diagonal
    // plus x, y for 1 or minus x, y for 1
    // [0, 0] -> [1, 1] -> [2, 2]

    // check vertical
    // plus x for 1 or minus x for 1
    // [0, 0] -> [1, 0] -> [2, 0]
    
    // check horizontal
    // plus y for 1 or minus y for 1
    // [0, 0] -> [0, 1] -> [0, 2]

    return win;
  };

  const handleClick = (x: number, y: number) => {
    if (steps[`${x}-${y}`]) return;
    setSteps({ ...steps, [`${x}-${y}`]: turn });
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);

    checkWin(x, y);
  };

  const reset = () => {
    setSteps({});
    setTurn(TURNS.X);
  }

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
                  steps[`${x}-${y}`] === TURNS.X ? "bg-red-500" : "",
                  steps[`${x}-${y}`] === TURNS.O ? "bg-blue-500" : ""
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
