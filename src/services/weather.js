export async function geocodeCity(query) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
  );
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  return data.results[0];
}

export async function fetchForecast({ latitude, longitude, timezone }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,pressure_msl,visibility,cloud_cover,uv_index&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,uv_index_max,sunrise,sunset,precipitation_probability_max&timezone=${encodeURIComponent(
    timezone
  )}&forecast_days=7`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather.");
  return await res.json();
}

export async function fetchAirQuality({ latitude, longitude }) {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return await res.json();
}
