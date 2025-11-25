import React from "react";
import { formatTemp, cToF } from "../utils/conversions.js";

export default function WeatherChart({ daily, unit }) {
  if (!daily) return null;

  const days = daily.time.slice(0, 7).map((d, i) => ({
    date: new Date(d),
    tmin: unit === "C" ? daily.temperature_2m_min[i] : cToF(daily.temperature_2m_min[i]),
    tmax: unit === "C" ? daily.temperature_2m_max[i] : cToF(daily.temperature_2m_max[i]),
    precip: daily.precipitation_sum[i],
  }));

  // Calculate min/max for scaling
  const allTemps = days.flatMap(d => [d.tmin, d.tmax]);
  const tempMin = Math.min(...allTemps);
  const tempMax = Math.max(...allTemps);
  const tempRange = tempMax - tempMin || 1;

  const precipMax = Math.max(...days.map(d => d.precip), 1);

  const normalize = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 20px 0" }}>Temperature & Precipitation Trends</h3>
      
      <div style={{ position: "relative", height: 200 }}>
        {/* Precipitation bars */}
        <div style={{ display: "flex", gap: 8, height: "100%", alignItems: "flex-end" }}>
          {days.map((d, i) => {
            const height = (d.precip / precipMax) * 50; // Max 50% of chart height
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Precipitation bar */}
                {d.precip > 0 && (
                  <div
                    style={{
                      width: "60%",
                      height: `${height}%`,
                      background: "rgba(59, 130, 246, 0.3)",
                      border: "1px solid rgba(59, 130, 246, 0.5)",
                      borderRadius: "4px 4px 0 0",
                      marginBottom: 4,
                    }}
                    title={`${Math.round(d.precip)} mm`}
                  />
                )}
                
                {/* Day label */}
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>
                  {d.date.toLocaleDateString(undefined, { weekday: "short" })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Temperature line chart overlay */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* Max temperature line */}
          <polyline
            points={days
              .map((d, i) => {
                const x = ((i + 0.5) / days.length) * 100;
                const y = 100 - normalize(d.tmax, tempMin, tempMax) * 0.8 - 10;
                return `${x}%,${y}%`;
              })
              .join(" ")}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Min temperature line */}
          <polyline
            points={days
              .map((d, i) => {
                const x = ((i + 0.5) / days.length) * 100;
                const y = 100 - normalize(d.tmin, tempMin, tempMax) * 0.8 - 10;
                return `${x}%,${y}%`;
              })
              .join(" ")}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Temperature data points */}
          {days.map((d, i) => {
            const x = ((i + 0.5) / days.length) * 100;
            const yMax = 100 - normalize(d.tmax, tempMin, tempMax) * 0.8 - 10;
            const yMin = 100 - normalize(d.tmin, tempMin, tempMax) * 0.8 - 10;
            
            return (
              <g key={i}>
                <circle cx={`${x}%`} cy={`${yMax}%`} r="4" fill="#ef4444" />
                <circle cx={`${x}%`} cy={`${yMin}%`} r="4" fill="#3b82f6" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginTop: 16, fontSize: 12, justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 20, height: 3, background: "#ef4444", borderRadius: 2 }} />
          <span>High Temp</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 20, height: 3, background: "#3b82f6", borderRadius: 2 }} />
          <span>Low Temp</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 20, height: 12, background: "rgba(59, 130, 246, 0.3)", border: "1px solid rgba(59, 130, 246, 0.5)", borderRadius: 2 }} />
          <span>Precipitation</span>
        </div>
      </div>
    </div>
  );
}
