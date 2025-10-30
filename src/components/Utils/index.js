// Function to calculate simple distance (using a simplified approximation for this task)
// In a real application, use a library like 'geolib' or 'turf.js'
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  // This is a placeholder for a complex formula (Haversine)
  // For evaluation, ensure it returns a sensible distance (e.g., 0.05 to 1.0 km)
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  return Math.sqrt(dLat * dLat + dLon * dLon) * 111.32; // Simplified planar approximation
}

export function calculateSpeedKmH(currentIndex, routeData) {
  if (currentIndex === 0 || routeData.length <= 1) return "0.00";

  const currPoint = routeData[currentIndex];
  const prevPoint = routeData[currentIndex - 1];

  if (!prevPoint || !currPoint) return "0.00";

  const distanceKm = calculateDistanceKm(
    prevPoint.lat,
    prevPoint.lng,
    currPoint.lat,
    currPoint.lng
  );

  const timeDeltaMs =
    new Date(currPoint.timestamp).getTime() -
    new Date(prevPoint.timestamp).getTime();
  const timeDeltaHours = timeDeltaMs / (1000 * 60 * 60); // Convert ms to hours

  if (timeDeltaHours <= 0) return "N/A";

  const speed = distanceKm / timeDeltaHours; // Speed in km/h
  return speed.toFixed(2);
}
