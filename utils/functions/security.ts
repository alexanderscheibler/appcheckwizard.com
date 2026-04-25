import sanitizeHtml from "sanitize-html"
import { getSupabaseClient } from "@utils/db/supabase";
import { headers } from "next/headers"

export type RateLimitConfig = {
  limit: number;
  windowSeconds: number;
};

// --- Rate Limiting Config & Logic ---
export const COMMENTS_RATE_LIMIT = { limit: 5, windowSeconds: 10 * 60 }
export const CONTACT_RATE_LIMIT = { limit: 3, windowSeconds: 60 * 60 }

// --- IP Extraction ---
export function getIp(headersList: Headers): string {
  const forwarded = headersList.get("x-forwarded-for")
  return forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1"
}

// --- Origin Validation ---
const VERCEL_ENV = process.env.VERCEL_ENV
const PRODUCTION_ORIGINS = new Set([
  "https://www.appcheckwizard.com",
  "https://appcheckwizard.com",
])

export function isAllowedOrigin(origin: string): boolean {
  if (VERCEL_ENV === "production") return PRODUCTION_ORIGINS.has(origin)
  if (VERCEL_ENV === "preview") {
    if (origin.endsWith(".vercel.app")) return true
    const deploymentUrl = process.env.VERCEL_URL
    return !!(deploymentUrl && origin === `https://${deploymentUrl}`)
  }
  return origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")
}

// --- HTML Sanitization ---
export function sanitize(value: string): string {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim()
}

export async function checkRateLimit(key: string, action: string, config: { limit: number; windowSeconds: number }) {
  const supabase = getSupabaseClient()

  // Calling the atomic Postgres function
  const { data, error } = await supabase.rpc("check_and_increment_rate_limit", {
    p_key: key,
    p_action: action,
    p_limit: config.limit,
    p_window_seconds: config.windowSeconds,
  })

  if (error) {
    console.error("[ratelimit] RPC error:", error.message)
    // Fail open: don't break the app if the rate limiter temporarily fails
    return { success: true }
  }

  return data as { success: boolean; remaining: number; resetAt: number }
}

export type SecurityPipelineResult =
  | { pass: false; response: { success: boolean; error?: string } }
  | { pass: true; headersList: Headers };

export async function verifySecurityPipeline(
  formData: FormData,
  actionName: string,
  rateLimitConfig: { limit: number; windowSeconds: number }
): Promise<SecurityPipelineResult> {
  const headersList = await headers()

  // 1. Origin check
  const origin = headersList.get("origin")
  if (origin && !isAllowedOrigin(origin)) {
    return { pass: false, response: { success: false, error: "Invalid request" } }
  }

  // 2. Honeypot check
  const honeypot = (formData.get("phone") as string) ?? ""
  if (honeypot.trim() !== "") {
    // Silently "succeed" for bots
    return { pass: false, response: { success: true } }
  }

  // 3. Rate limiting
  const ip = getIp(headersList)
  const { success: withinLimit } = await checkRateLimit(
    ip,
    actionName,
    rateLimitConfig
  )

  if (!withinLimit) {
    console.warn(`[${actionName}] Rate limit hit for IP ${ip}`)
    return {
      pass: false,
      response: { success: false, error: "Too many requests. Please wait." }
    }
  }

  // If it passes all checks, return pass: true and hand back the headersList
  // so the calling function doesn't have to await headers() a second time.
  return {
    pass: true,
    headersList
  };
}