import React from "react";
import { WMO_CODE } from "../utils/wmo.js";
import { formatTemp, cToF } from "../utils/conversions.js";

export default function HourlyForecast({ hourly, unit }) {
  if (!hourly) return null;

  // Show next 24 hours
  const hours = hourly.time.slice(0, 24).map((time, i) => ({
    time: new Date(time),
    temp: unit === "C" ? hourly.temperature_2m[i] : cToF(hourly.temperature_2m[i]),
    code: hourly.weather_code[i],
    precipProb: hourly.precipitation_probability[i],
    wind: hourly.wind_speed_10m[i],
  }));

  const formatTime = (dt) => {
    return dt.toLocaleTimeString(undefined, { hour: "numeric", hour12: true });
  };

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 12px 0" }}>24-Hour Forecast</h3>
      <div className="hourly-scroll">
        {hours.map((h, idx) => {
          const meta = WMO_CODE[h.code] || { emoji: "☁️", label: "" };
          const isNow = idx === 0;

          return (
            <div key={idx} className="hour-card">
              <div style={{ fontWeight: 600, fontSize: 13 }}>
                {isNow ? "Now" : formatTime(h.time)}
              </div>
              <div style={{ fontSize: 32, margin: "8px 0" }}>{meta.emoji}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {formatTemp(h.temp, unit)}
              </div>
              {h.precipProb > 0 && (
                <div style={{ fontSize: 12, marginTop: 6, opacity: 0.85 }}>
                  💧 {h.precipProb}%
                </div>
              )}
              <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>
                💨 {Math.round(h.wind)} km/h
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
