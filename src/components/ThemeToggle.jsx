import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      className="button"
      onClick={() => setTheme(next)}
      title={`Switch to ${next} mode`}
      aria-label="Toggle color theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
