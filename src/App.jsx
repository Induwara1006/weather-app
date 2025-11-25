import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import UnitToggle from "./components/UnitToggle.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Forecast from "./components/Forecast.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";
import AirQuality from "./components/AirQuality.jsx";
import WeatherDetails from "./components/WeatherDetails.jsx";
import WeatherAlerts from "./components/WeatherAlerts.jsx";
import SavedLocations from "./components/SavedLocations.jsx";
import LocationButton from "./components/LocationButton.jsx";
import WeatherChart from "./components/WeatherChart.jsx";
import { cToF } from "./utils/conversions.js";
import { geocodeCity, fetchForecast, fetchAirQuality } from "./services/weather.js";

export default function App() {
  const [query, setQuery] = useState("Colombo");
  const [unit, setUnit] = useState("C"); // "C" | "F"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [place, setPlace] = useState("");
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [coords, setCoords] = useState(null);

  // Theme state (persisted)
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Derived display data (unit conversion)
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

  // Search flow
  const search = async (cityQuery = query) => {
    if (!cityQuery.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const g = await geocodeCity(cityQuery);
      if (!g) throw new Error("City not found. Try another search.");

      const { latitude, longitude, name, country, admin1, timezone } = g;
      const display = [name, admin1, country].filter(Boolean).join(", ");

      const w = await fetchForecast({ latitude, longitude, timezone });
      const aq = await fetchAirQuality({ latitude, longitude });
      
      setPlace(display);
      setCurrent(w.current);
      setDaily(w.daily);
      setHourly(w.hourly);
      setAirQuality(aq);
      setCoords({ latitude, longitude });
    } catch (e) {
      console.error(e);
      setError(e.message || "Something went wrong.");
      setPlace("");
      setCurrent(null);
      setDaily(null);
      setHourly(null);
      setAirQuality(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Geolocation
  const useMyLocation = () => {
    setIsLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const w = await fetchForecast({ latitude, longitude, timezone: "auto" });
          const aq = await fetchAirQuality({ latitude, longitude });
          
          setPlace("Your Location");
          setCurrent(w.current);
          setDaily(w.daily);
          setHourly(w.hourly);
          setAirQuality(aq);
          setCoords({ latitude, longitude });
        } catch (e) {
          console.error(e);
          setError(e.message || "Failed to fetch weather for your location.");
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Unable to access your location. Please enable location services.");
        setIsLoading(false);
      }
    );
  };

  // Initial load
  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="row mb">
          <h1 className="title">Weather App ✨</h1>
          <div className="row" style={{ gap: 8 }}>
            <span className="pill">Open-Meteo API</span>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>

        <div className="grid">
          <div className="row searchbar" style={{ gap: 8 }}>
            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={() => search()}
              isLoading={isLoading}
            />
            <LocationButton onGetLocation={useMyLocation} isLoading={isLoading} />
          </div>

          <UnitToggle unit={unit} setUnit={setUnit} />

          {error && (
            <div className="card error">
              <strong>Oops:</strong> {error}
            </div>
          )}

          {!error && (
            <>
              <SavedLocations onSelectLocation={(loc) => search(loc)} />
              <WeatherAlerts daily={daily} />
              <CurrentWeather place={place} current={currentDisplay} unit={unit} />
              <HourlyForecast hourly={hourly} unit={unit} />
              <WeatherChart daily={dailyDisplay} unit={unit} />
              <Forecast daily={dailyDisplay} unit={unit} />
              <WeatherDetails current={current} daily={daily} />
              <AirQuality airQuality={airQuality} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
