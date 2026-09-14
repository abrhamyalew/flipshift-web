"use server";

interface WaitlistResult {
  success: boolean;
  message: string;
}

/**
 * Submit an email to the FlipShift waitlist.
 *
 * Currently a mock implementation. In production, this will proxy
 * to the NestJS backend via:
 *   POST /api/waitlist { email, platform? }
 *
 * Expected NestJS contract:
 *   - 201: { id: string, email: string, createdAt: string }
 *   - 409: { error: "already_registered" }
 *   - 422: { error: "invalid_email" }
 */
export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  // Mock: simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock: always succeed
  // In production: fetch(`${process.env.NESTJS_API_URL}/waitlist`, { ... })
  console.log(`[Waitlist] New signup: ${email}`);

  return {
    success: true,
    message: "You're on the list! We'll be in touch.",
  };
}

/**
 * Record the user's platform preference after waitlist signup.
 *
 * Expected NestJS contract:
 *   PATCH /api/waitlist/:id { platform: "android" | "ios" }
 */
export async function recordPlatform(
  email: string,
  platform: "android" | "ios"
): Promise<void> {
  console.log(`[Waitlist] Platform preference: ${email} -> ${platform}`);
}
