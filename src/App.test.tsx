import App from "./App";
import { render, screen, userEvent } from "./utils/test-utils";

describe("snapshot app", () => {
  it("should match snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
