import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [position, setPosition] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [networkInfo, setNetworkInfo] = useState("");
  const canvasRef = useRef(null);
  const tipsRef = useRef(null);
  const [showTips, setShowTips] = useState(false);

  // Reverse Geocoding Function
  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setLocationName(data.display_name);
      } else {
        setLocationName("Location not found");
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      setLocationName("Failed to fetch location");
    }
  };

  // Geolocation API
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        fetchLocationName(latitude, longitude); // Get location name
      },
      () => {
        alert("Geolocation failed or permission denied.");
      }
    );
  }, []);

  // Canvas API
  useEffect(() => {
    if (position && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "lightblue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.beginPath();
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "14px sans-serif";
      ctx.fillText(`You are here`, x + 12, y + 5);
    }
  }, [position]);

  // Intersection Observer API
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowTips(true), 800);
        }
      },
      { threshold: 0.5 }
    );
    if (tipsRef.current) observer.observe(tipsRef.current);
    return () => observer.disconnect();
  }, []);

  // Network Information API
  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      setNetworkInfo(`Connection type: ${connection.effectiveType}`);
      if (["slow-2g", "2g"].includes(connection.effectiveType)) {
        alert("You're on a slow network. Some features may be limited.");
      }
    }
  }, []);

  return (
    <div className="min-h-[250vh] bg-gray-100 text-gray-800 p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">🌍 Smart Travel Dashboard</h1>

      {/* Location Section */}
      <div className="border shadow-md p-4 bg-white">
        <h2 className="text-xl font-semibold mb-2">Your Location</h2>
        <canvas ref={canvasRef} width={300} height={200} className="border rounded"></canvas>
        {position ? (
          <>
            <p className="mt-2 text-sm">
              Lat: {position.lat.toFixed(4)} | Lng: {position.lng.toFixed(4)}
            </p>
            {locationName && (
              <p className="text-sm text-blue-600">
                Location: {locationName}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-red-500">Location not available or blocked.</p>
        )}
      </div>

      {/* Network Status */}
      <div className="border shadow-md p-4 bg-white">
        <h2 className="text-xl font-semibold mb-2">Network Status</h2>
        <p>{networkInfo || "Network info not available"}</p>
      </div>

      {/* Travel Tips (Lazy Loaded) */}
      <div ref={tipsRef} className="mt-40 border shadow-md p-4 bg-white min-h-[150px]">
        <h2 className="text-xl font-semibold mb-2">Travel Tips (Lazy Loaded)</h2>
        {!showTips ? (
          <p className="italic text-gray-500">Scroll down to load travel tips...</p>
        ) : (
          <ul className="list-disc ml-5 space-y-1">
            <li>Stay hydrated during long trips.</li>
            <li>Keep digital and printed copies of important documents.</li>
            <li>Use offline maps in case of no network.</li>
          </ul>
        )}
      </div>
    </div>
  );
}
