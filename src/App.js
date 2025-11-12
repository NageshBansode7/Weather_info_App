import './App.css';
import { useState } from 'react';

function App() {
  console.log("API Key from .env:", process.env.REACT_APP_WEATHER_API_KEY);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading,setLoading]= useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
    setLoading(false);
  };

  return (
     <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #83a4d4, #b6fbff)",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <h1 style={{ color: "#222", marginBottom: "20px" }}>🌤 Weather Info App</h1>

    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "300px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City Name"
        style={{
          padding: "10px",
          width: "90%",
          borderRadius: "8px",
          border: "1px solid gray",
        }}
      />

      <button
        onClick={getWeather}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#0077b6",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none",
          fontWeight: "bold",
        }}
      >
        Get Weather
      </button>

      <p style={{ marginTop: "15px", color: "#333" }}>City entered: {city}</p>

      {loading && <p style={{ color: "blue" }}>Loading...</p>}

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px", color: "#333" }}>
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌦 Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  </div>

  );
}

export default App;
