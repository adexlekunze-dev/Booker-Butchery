/**
 * Distance Calculation Utilities
 * Haversine formula for calculating distance between two geographic coordinates
 */

/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate distance from a user's delivery address to a branch
 * @param userAddress User's delivery address with coordinates
 * @param branchCoordinates Branch coordinates
 * @returns Distance in miles
 */
export function calculateUserToBranchDistance(
  userAddress: { coordinates: { latitude: number; longitude: number } },
  branchCoordinates: { latitude: number; longitude: number }
): number {
  return calculateDistance(
    userAddress.coordinates.latitude,
    userAddress.coordinates.longitude,
    branchCoordinates.latitude,
    branchCoordinates.longitude
  );
}

/**
 * Sort branches by distance from a given coordinate
 * @param branches Array of branches with coordinates
 * @param fromLat Source latitude
 * @param fromLon Source longitude
 * @returns Branches sorted by distance with distance property added
 */
export function sortBranchesByDistance<T extends { coordinates: { latitude: number; longitude: number } }>(
  branches: T[],
  fromLat: number,
  fromLon: number
): (T & { distance_miles: number })[] {
  return branches
    .map((branch) => ({
      ...branch,
      distance_miles: calculateDistance(
        fromLat,
        fromLon,
        branch.coordinates.latitude,
        branch.coordinates.longitude
      ),
    }))
    .sort((a, b) => a.distance_miles - b.distance_miles);
}

/**
 * Find nearby branches within a certain radius
 * @param branches Array of branches
 * @param fromLat Source latitude
 * @param fromLon Source longitude
 * @param radiusMiles Maximum distance in miles
 * @returns Branches within radius, sorted by distance
 */
export function findNearbyBranches<T extends { coordinates: { latitude: number; longitude: number } }>(
  branches: T[],
  fromLat: number,
  fromLon: number,
  radiusMiles: number = 10
): (T & { distance_miles: number })[] {
  return sortBranchesByDistance(branches, fromLat, fromLon).filter(
    (branch) => branch.distance_miles <= radiusMiles
  );
}

