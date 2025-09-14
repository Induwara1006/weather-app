import React from "react";
import { WMO_CODE } from "../utils/wmo.js";
import { formatTemp } from "../utils/conversions.js";

export default function CurrentWeather({ place, current, unit }) {
  if (!current) return null;
  const meta = WMO_CODE[current.weather_code] || { label: "", emoji: "" };

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>{place}</h2>
          <div className="sub">{meta.label}</div>
        </div>
        <div className="pill">{meta.emoji}</div>
      </div>

     <div className="metrics" style={{ marginTop: 12 }}>

        <div>
          <div className="sub">Temperature</div>
          <div className="kpi">{formatTemp(current.temperature_2m, unit)}</div>
        </div>
        <div>
          <div className="sub">Feels like</div>
          <div className="kpi">{formatTemp(current.apparent_temperature, unit)}</div>
        </div>
        <div>
          <div className="sub">Wind</div>
          <div className="kpi">{Math.round(current.wind_speed_10m)} km/h</div>
        </div>
        <div>
          <div className="sub">Humidity</div>
          <div className="kpi">{Math.round(current.relative_humidity_2m)}%</div>
        </div>
      </div>
    </div>
  );
}
