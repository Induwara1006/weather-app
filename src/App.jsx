import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import UnitToggle from "./components/UnitToggle.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Forecast from "./components/Forecast.jsx";
import { cToF } from "./utils/conversions.js";
import { geocodeCity, fetchForecast } from "./services/weather.js";

export default function App() {
  const [query, setQuery] = useState("Colombo");
  const [unit, setUnit] = useState("C"); // "C" | "F"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [place, setPlace] = useState("");
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);

  const currentDisplay = useMemo(() => {
    if (!current) return null;
    if (unit === "C") return current;
    return {
      ...current,
      temperature_2m: cToF(current.temperature_2m),
      apparent_temperature: cToF(current.apparent_temperature),
    };
  }, [current, unit]);

  const dailyDisplay = useMemo(() => {
    if (!daily) return null;
    if (unit === "C") return daily;
    return {
      ...daily,
      temperature_2m_min: daily.temperature_2m_min.map(cToF),
      temperature_2m_max: daily.temperature_2m_max.map(cToF),
    };
  }, [daily, unit]);

  const search = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const g = await geocodeCity(query);
      if (!g) throw new Error("City not found. Try another search.");

      const { latitude, longitude, name, country, admin1, timezone } = g;
      const display = [name, admin1, country].filter(Boolean).join(", ");

      const w = await fetchForecast({ latitude, longitude, timezone });
      setPlace(display);
      setCurrent(w.current);
      setDaily(w.daily);
    } catch (e) {
      console.error(e);
      setError(e.message || "Something went wrong.");
      setPlace("");
      setCurrent(null);
      setDaily(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="row mb">
          <h1 className="title">Weather App ✨</h1>
          <span className="pill">Open-Meteo API</span>
        </div>

        <div className="grid">
          <SearchBar query={query} setQuery={setQuery} onSearch={search} isLoading={isLoading} />
          <UnitToggle unit={unit} setUnit={setUnit} />

          {error && (
            <div className="card error">
              <strong>Oops:</strong> {error}
            </div>
          )}

          {!error && (
            <>
              <CurrentWeather place={place} current={currentDisplay} unit={unit} />
              <Forecast daily={dailyDisplay} unit={unit} />
            </>
          )}

          <div className="card note">
            <div>Notes for interviewers:</div>
            <ul>
              <li>Components + hooks + derived state + async fetching.</li>
              <li>No API key required.</li>
              <li>Unit conversions done client-side.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
