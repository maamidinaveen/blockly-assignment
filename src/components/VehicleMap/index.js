import React, { useState, useEffect, useRef } from "react";

import { MapContainer, Polyline, TileLayer } from "react-leaflet";

import AnimatedMaker from "../AnimatedMarker";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import Controls from "../Controls";

import "./index.css";

// Define the shape of the data
const INITIAL_CENTER = [17.385044, 78.486671];

// Define the icon once (outside the component if possible, or use memoization)
const vehicleIcon = L.divIcon({
  className: "text-2xl",
  html: '<span class="text-red-600">🚗</span>',
  iconSize: [24, 24],
});

function VehicleMap() {
  const [routeData, setRouteData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetching from the public directory
        const response = await fetch("http://localhost:3001/api/route");
        const data = await response.json();
        console.log(data);

        // Transform data into Leaflet/React-Leaflet format: [lat, lng]
        setRouteData(
          data.map((each) => ({
            lat: each.latitude,
            lng: each.longitude,
            timestamp: each.timestamp,
          }))
        );
      } catch (error) {
        console.log("Error loading route data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (
      isPlaying &&
      routeData.length > 0 &&
      currentIndex < routeData.length - 1
    ) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentIndex, routeData]);

  const fullRouteCoords = routeData.map((each) => [each.lat, each.lng]);

  const traveledCoords = routeData
    .slice(0, currentIndex + 1)
    .map((each) => [each.lat, each.lng]);

  const currentPosition = routeData[currentIndex] || routeData[0];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={INITIAL_CENTER}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Draw the entire planned route path */}
        {routeData.length > 0 && (
          <Polyline
            positions={fullRouteCoords}
            pathOptions={{ color: "red", weight: 3, opacity: 0.5 }}
          />
        )}

        {/* Draw traveled path (foreground) */}
        {routeData.length > 0 && (
          <Polyline
            positions={traveledCoords}
            pathOptions={{ color: "green", weight: 4, opacity: 0.9 }}
          />
        )}
        {/* Vehicle Marker and Traveled Route components will go here */}
        {routeData.length > 0 && (
          <AnimatedMaker
            position={[currentPosition.lat, currentPosition.lng]}
            icon={vehicleIcon}
          />
        )}
      </MapContainer>
      {/* UI Controls component will go here */}
      <Controls
        currentPosition={currentPosition}
        currentIndex={currentIndex}
        routeData={routeData}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onReset={resetSimulation}
      />
    </div>
  );
}

export default VehicleMap;
