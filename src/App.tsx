import clsx from "clsx";
import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";
import { BOARD_LENGTH, TURNS, checkDiagonal, checkHorizontal, checkReverseDiagonal, checkVertical } from "./utils/board";

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
    <div data-testid="board">
      <div className="text-center mb-2">
        <h1 className="text-4xl text-center">Tic Tac Toe</h1>
        <h2 className="text-2xl text-center">Turn: {turn}</h2>
        <button
          className="rounded-md bg-blue-400 text-white py-2 px-4"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex border">
          {[...new Array(BOARD_LENGTH)].map((_, x) => (
            <div key={x} className="border-black">
              {[...new Array(BOARD_LENGTH)].map((_, y) => (
                <Cell
                  key={`${x}-${y}`}
                  className={clsx(
                    "hover:bg-slate-200 transition-all duration-200",
                    steps[`${x}-${y}`] === TURNS.X
                      ? "bg-red-500 hover:bg-red-500"
                      : "",
                    steps[`${x}-${y}`] === TURNS.O
                      ? "bg-blue-500 hover:bg-blue-500"
                      : ""
                  )}
                  dataTestid={`${x}-${y}`}
                  onClick={() => handleClick(x, y)}
                >
                  {steps[`${x}-${y}`] && (
                    <span className="text-3xl">{steps[`${x}-${y}`]}</span>
                  )}
                </Cell>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
