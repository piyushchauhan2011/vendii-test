import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Github Repos", () => {
  render(<App />);
  const linkElement = screen.getByText(/Github Repos/i);
  expect(linkElement).toBeInTheDocument();
});
