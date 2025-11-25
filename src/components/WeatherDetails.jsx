import React from "react";

export default function WeatherDetails({ current, daily }) {
  if (!current || !daily) return null;

  const todaySunrise = daily.sunrise?.[0] ? new Date(daily.sunrise[0]).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "N/A";
  const todaySunset = daily.sunset?.[0] ? new Date(daily.sunset[0]).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "N/A";
  const uvIndex = daily.uv_index_max?.[0] || current.uv_index || 0;

  const getUVLevel = (uv) => {
    if (uv < 3) return { label: "Low", color: "#10b981" };
    if (uv < 6) return { label: "Moderate", color: "#eab308" };
    if (uv < 8) return { label: "High", color: "#f97316" };
    if (uv < 11) return { label: "Very High", color: "#ef4444" };
    return { label: "Extreme", color: "#991b1b" };
  };

  const uvLevel = getUVLevel(uvIndex);

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 16px 0" }}>Weather Details</h3>
      
      <div className="metrics" style={{ gap: 16 }}>
        <div>
          <div className="sub">☀️ UV Index</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>
            {Math.round(uvIndex)}
          </div>
          <div style={{ fontSize: 12, marginTop: 4, color: uvLevel.color, fontWeight: 600 }}>
            {uvLevel.label}
          </div>
        </div>

        <div>
          <div className="sub">🌅 Sunrise</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>
            {todaySunrise}
          </div>
        </div>

        <div>
          <div className="sub">🌇 Sunset</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>
            {todaySunset}
          </div>
        </div>

        <div>
          <div className="sub">🎚️ Pressure</div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
            {Math.round(current.pressure_msl || 0)}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>hPa</div>
        </div>

        <div>
          <div className="sub">👁️ Visibility</div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
            {Math.round((current.visibility || 0) / 1000)}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>km</div>
        </div>

        <div>
          <div className="sub">☁️ Cloud Cover</div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
            {Math.round(current.cloud_cover || 0)}%
          </div>
        </div>
      </div>
    </div>
  );
}
