import React, { useState } from "react";

export default function SavedLocations({ onSelectLocation }) {
  const [saved, setSaved] = useState(() => {
    const stored = localStorage.getItem("savedLocations");
    return stored ? JSON.parse(stored) : [];
  });
  const [showInput, setShowInput] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  const addLocation = () => {
    if (!newLocation.trim()) return;
    const updated = [...saved, newLocation.trim()];
    setSaved(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
    setNewLocation("");
    setShowInput(false);
  };

  const removeLocation = (index) => {
    const updated = saved.filter((_, i) => i !== index);
    setSaved(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
  };

  if (saved.length === 0 && !showInput) {
    return (
      <div className="card" style={{ maxWidth: "600px", alignSelf: "flex-start" }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: "16px" }}>Saved Locations</h3>
          <button className="button" onClick={() => setShowInput(true)}>
            + Add
          </button>
        </div>
        <div style={{ marginTop: 12, opacity: 0.7, fontSize: 13 }}>
          No saved locations yet. Add your favorites for quick access!
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: "800px", alignSelf: "flex-start" }}>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: "16px" }}>Saved Locations</h3>
        <button className="button" onClick={() => setShowInput(!showInput)}>
          {showInput ? "Cancel" : "+ Add"}
        </button>
      </div>

      {showInput && (
        <div className="row" style={{ marginBottom: 12, gap: 6 }}>
          <input
            className="input"
            placeholder="Enter city name..."
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addLocation()}
          />
          <button className="button" onClick={addLocation}>
            Save
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {saved.map((loc, idx) => (
          <div
            key={idx}
            className="location-chip"
            style={{
              padding: "6px 10px",
              background: "var(--pill-bg)",
              border: "1px solid var(--pill-border)",
              borderRadius: "999px",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
          >
            <span onClick={() => onSelectLocation(loc)}>{loc}</span>
            <button
              onClick={() => removeLocation(idx)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text)",
                cursor: "pointer",
                padding: 0,
                fontSize: 16,
                opacity: 0.7,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
