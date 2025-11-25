import React from "react";

const AQI_LEVELS = {
  1: { label: "Good", color: "#10b981", emoji: "😊" },
  2: { label: "Fair", color: "#84cc16", emoji: "🙂" },
  3: { label: "Moderate", color: "#eab308", emoji: "😐" },
  4: { label: "Poor", color: "#f97316", emoji: "😷" },
  5: { label: "Very Poor", color: "#ef4444", emoji: "🤢" },
};

function getAQILevel(aqi) {
  if (aqi <= 20) return 1;
  if (aqi <= 40) return 2;
  if (aqi <= 60) return 3;
  if (aqi <= 80) return 4;
  return 5;
}

export default function AirQuality({ airQuality }) {
  if (!airQuality || !airQuality.current) return null;

  const { european_aqi, pm2_5, pm10, nitrogen_dioxide, ozone } = airQuality.current;
  const level = getAQILevel(european_aqi);
  const info = AQI_LEVELS[level];

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Air Quality</h3>
        <span className="pill" style={{ backgroundColor: info.color, color: "#fff", border: "none" }}>
          {info.emoji} {info.label}
        </span>
      </div>

      <div style={{ fontSize: 14, marginBottom: 16, opacity: 0.9 }}>
        Air Quality Index: <strong>{Math.round(european_aqi)}</strong>
      </div>

      <div className="metrics" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 12 }}>
        <div>
          <div className="sub">PM2.5</div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
            {Math.round(pm2_5 || 0)}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>µg/m³</div>
        </div>
        <div>
          <div className="sub">PM10</div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
            {Math.round(pm10 || 0)}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>µg/m³</div>
        </div>
        <div>
          <div className="sub">NO₂</div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
            {Math.round(nitrogen_dioxide || 0)}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>µg/m³</div>
        </div>
        <div>
          <div className="sub">O₃</div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
            {Math.round(ozone || 0)}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>µg/m³</div>
        </div>
      </div>
    </div>
  );
}
