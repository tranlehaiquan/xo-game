import App from "./App";
import { render, screen, userEvent } from "./utils/test-utils";

describe("snapshot app", () => {
  it("should match snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});

describe("game logic", () => {
  // render board
  it("should render board", () => {
    render(<App />);
    expect(screen.getByTestId("board")).toBeInTheDocument();
  });

  // game start with player x
  it("should start with player x", () => {
    render(<App />);
    expect(screen.getByText("Turn: x")).toBeInTheDocument();
  });

  // player x can click on a square to make a move
  it("should allow player x to make a move", async () => {
    render(<App />);
    const firstSquare = screen.getByTestId("0-0");
    await userEvent.click(firstSquare);
    expect(firstSquare).toHaveTextContent("x");
  });

  // second move should be player o
  it("should allow player o to make a move", async () => {
    render(<App />);
    const firstSquare = screen.getByTestId("0-0");
    await userEvent.click(firstSquare);

    const secondSquare = screen.getByTestId("0-1");
    await userEvent.click(secondSquare);
    expect(secondSquare).toHaveTextContent("o");
  });
});
