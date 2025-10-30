import React, { useEffect, useRef } from "react";

import { useMap, Marker } from "react-leaflet";

import L from "leaflet";

function AnimatedMaker({ position, icon, duration = 1000 }) {
  const markerRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    const marker = markerRef.current;
    const strtLatLang = marker.getLatLng();
    const endLatLang = L.latLng(position);

    // If it's the first move, just set the position
    if (strtLatLang.equals(endLatLang)) return;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(1, elapsedTime / duration);

      // Interpolation function (simple linear)

      const lat =
        strtLatLang.lat + (endLatLang.lat - strtLatLang.lat) * progress;
      const lng =
        strtLatLang.lng + (endLatLang.lng - strtLatLang.lng) * progress;

      marker.setLatLng([lat, lng]);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensures the marker is exactly at the final point
        marker.setLatLng(endLatLang);
      }
    };
    requestAnimationFrame(animate);

    // Optionally pan the map to follow the vehicle

    map.panTo(endLatLang, { animate: true, duration: 1 });
  }, [position, map, duration]);

  return <Marker ref={markerRef} position={position} icon={icon} />;
}

export default AnimatedMaker;
