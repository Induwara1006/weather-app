import React from "react";

export default function LocationButton({ onGetLocation, isLoading }) {
  const handleClick = () => {
    if (navigator.geolocation) {
      onGetLocation();
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <button
      className="button"
      onClick={handleClick}
      disabled={isLoading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "10px 14px",
      }}
      title="Use my current location"
    >
      <span style={{ fontSize: 18 }}>📍</span>
      <span>My Location</span>
    </button>
  );
}
