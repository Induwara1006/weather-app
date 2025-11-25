import React from "react";
import { WMO_CODE } from "../utils/wmo.js";
import { formatTemp } from "../utils/conversions.js";

export default function Forecast({ daily, unit }) {
  if (!daily) return null;

  const days = daily.time.map((d, i) => ({
    date: new Date(d),
    tmin: daily.temperature_2m_min[i],
    tmax: daily.temperature_2m_max[i],
    code: daily.weather_code[i],
    precip: daily.precipitation_sum[i],
    precipProb: daily.precipitation_probability_max?.[i] || 0,
  }));

  const fmtDay = (dt) => dt.toLocaleDateString(undefined, { weekday: "short" });

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>7-day forecast</h3>
      </div>
      <div className="forecast" style={{ marginTop: 12 }}>
        {days.map((d, idx) => {
          const meta = WMO_CODE[d.code] || { emoji: "", label: "" };
          return (
            <div key={idx} className="day">
              <div style={{ fontWeight: 600 }}>{fmtDay(d.date)}</div>
              <div style={{ fontSize: 28, margin: "6px 0" }}>{meta.emoji}</div>
              <div className="sub">{meta.label}</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>
                {formatTemp(d.tmax, unit)} <span style={{ opacity: 0.7 }}>/ {formatTemp(d.tmin, unit)}</span>
              </div>
              {d.precipProb > 0 && (
                <div style={{ marginTop: 4, fontSize: 11, opacity: 0.85 }}>
                  💧 {d.precipProb}%
                </div>
              )}
              {d.precip > 0 && (
                <div style={{ marginTop: 2, fontSize: 11, opacity: 0.75 }}>
                  {Math.round(d.precip)} mm
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
