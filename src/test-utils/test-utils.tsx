import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/context/ThemeContext";

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
