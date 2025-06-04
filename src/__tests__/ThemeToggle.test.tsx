import { render, screen } from "../test-utils/test-utils"; // ✅ screen burada!

import ThemeToggle from "../components/ThemeToggle";

describe("ThemeToggle", () => {
  test("button doğru şekilde gösteriliyor", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /Tema:/i });
    expect(button).toBeInTheDocument();
  });
});
