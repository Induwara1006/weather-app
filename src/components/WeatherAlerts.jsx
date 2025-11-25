import React from "react";

export default function WeatherAlerts({ daily }) {
  if (!daily) return null;

  const alerts = [];

  // Check for extreme temperatures
  const maxTemp = Math.max(...daily.temperature_2m_max.slice(0, 3));
  const minTemp = Math.min(...daily.temperature_2m_min.slice(0, 3));

  if (maxTemp > 35) {
    alerts.push({
      type: "heat",
      icon: "🌡️",
      title: "Heat Advisory",
      message: `High temperatures up to ${Math.round(maxTemp)}°C expected. Stay hydrated!`,
      color: "#ef4444",
    });
  }

  if (minTemp < 0) {
    alerts.push({
      type: "cold",
      icon: "❄️",
      title: "Freeze Warning",
      message: `Temperatures may drop to ${Math.round(minTemp)}°C. Protect sensitive plants.`,
      color: "#3b82f6",
    });
  }

  // Check for heavy precipitation
  const maxPrecip = Math.max(...daily.precipitation_sum.slice(0, 3));
  if (maxPrecip > 50) {
    alerts.push({
      type: "rain",
      icon: "🌧️",
      title: "Heavy Rain Expected",
      message: `Up to ${Math.round(maxPrecip)}mm of rainfall forecasted. Plan accordingly.`,
      color: "#0ea5e9",
    });
  }

  // Check for high precipitation probability
  const maxPrecipProb = Math.max(...(daily.precipitation_probability_max?.slice(0, 3) || [0]));
  if (maxPrecipProb > 80 && alerts.every(a => a.type !== "rain")) {
    alerts.push({
      type: "rain-prob",
      icon: "☔",
      title: "Rain Likely",
      message: `${maxPrecipProb}% chance of precipitation. Don't forget your umbrella!`,
      color: "#06b6d4",
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="card" style={{ borderColor: alerts[0].color, borderWidth: 2 }}>
      <h3 style={{ margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: 8 }}>
        ⚠️ Weather Alerts
      </h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            style={{
              padding: 12,
              background: `${alert.color}15`,
              border: `1px solid ${alert.color}40`,
              borderRadius: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>{alert.icon}</span>
              <strong style={{ fontSize: 14 }}>{alert.title}</strong>
            </div>
            <div style={{ fontSize: 13, opacity: 0.9, marginLeft: 28 }}>
              {alert.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
