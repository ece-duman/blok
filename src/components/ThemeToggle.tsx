"use client";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 16px",
        margin: "1rem 0",
        backgroundColor: theme === "dark" ? "#222" : "#eee",
        color: theme === "dark" ? "#fff" : "#000",
        border: "1px solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Tema: {theme === "dark" ? "🌙 Karanlık" : "☀️ Aydınlık"}
    </button>
  );
}
