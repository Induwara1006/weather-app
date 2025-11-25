import React from "react";

export default function UnitToggle({ unit, setUnit }) {
  return (
    <div className="card row" style={{ justifyContent: "space-between", maxWidth: "300px", alignSelf: "flex-start" }}>
      <span style={{ fontWeight: 600, fontSize: "14px" }}>Units</span>
      <div className="row" style={{ gap: 6 }}>
        <button
          className="button"
          style={{ opacity: unit === "C" ? 1 : 0.6, minWidth: "45px" }}
          onClick={() => setUnit("C")}
        >
          °C
        </button>
        <button
          className="button"
          style={{ opacity: unit === "F" ? 1 : 0.6, minWidth: "45px" }}
          onClick={() => setUnit("F")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
