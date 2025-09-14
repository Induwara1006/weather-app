import React from "react";

export default function UnitToggle({ unit, setUnit }) {
  return (
    <div className="card row" style={{ justifyContent: "space-between" }}>
      <span style={{ fontWeight: 600 }}>Units</span>
      <div className="row" style={{ gap: 8 }}>
        <button
          className="button"
          style={{ opacity: unit === "C" ? 1 : 0.6 }}
          onClick={() => setUnit("C")}
        >
          °C
        </button>
        <button
          className="button"
          style={{ opacity: unit === "F" ? 1 : 0.6 }}
          onClick={() => setUnit("F")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
