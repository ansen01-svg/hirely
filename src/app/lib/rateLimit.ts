import { NextRequest } from "next/server";
import { LRUCache } from "lru-cache";

interface RateLimitData {
  count: number;
  startTime: number;
}

// Configure the LRU cache with explicit typing
const rateLimitCache = new LRUCache<string, RateLimitData>({
  max: 1000, // Max 1000 users tracked
  ttl: 60 * 60 * 1000, // Cache entries expire after 1 hour
});

// Utility function to extract the client's IP address
function getClientIP(req: NextRequest): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim(); // Return the first IP in the list
  }
  return req.headers.get("host") || "unknown"; // Fallback to host header or 'unknown'
}

// Rate-limit function
export const rateLimit = (
  request: NextRequest,
  limit: number,
  windowMs: number
) => {
  const ip = getClientIP(request);

  // Retrieve or initialize rate limit data
  const currentRate = rateLimitCache.get(ip) ?? {
    count: 0,
    startTime: Date.now(),
  };

  // Reset count if window has passed
  if (Date.now() - currentRate.startTime > windowMs) {
    currentRate.count = 0;
    currentRate.startTime = Date.now();
  }

  currentRate.count++;

  // Save updated rate in cache
  rateLimitCache.set(ip, currentRate);

  // Check if limit is exceeded
  if (currentRate.count > limit) {
    return false; // Rate limit exceeded
  }

  return true; // Allow request
};
