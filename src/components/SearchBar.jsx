import React from "react";

export default function SearchBar({ query, setQuery, onSearch, isLoading }) {
  return (
    <div className="card row" style={{ gap: 8 }}>
      <input
        className="input"
        type="text"
        placeholder="Search city (e.g., Colombo, London, Tokyo)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        autoFocus
      />
      <button className="button" onClick={onSearch} disabled={isLoading}>
        {isLoading ? "Searching…" : "Search"}
      </button>
    </div>
  );
}
