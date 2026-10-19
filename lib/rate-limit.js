const buckets = new Map();

function prune(now, windowMs) {
  for (const [key, entry] of buckets.entries()) {
    if (now - entry.start > windowMs) {
      buckets.delete(key);
    }
  }
}

/**
 * Simple in-memory rate limiter suitable for single-instance / serverless
 * warm instances. Not a substitute for edge WAF, but blocks casual abuse.
 */
export function rateLimit(key, { windowMs = 60_000, max = 5 } = {}) {
  const now = Date.now();
  prune(now, windowMs);

  const entry = buckets.get(key);
  if (!entry || now - entry.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return { allowed: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: windowMs - (now - entry.start),
    };
  }

  entry.count += 1;
  return { allowed: true, remaining: max - entry.count };
}
