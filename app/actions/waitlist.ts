"use server";

import { supabase } from "@/lib/supabase";

interface WaitlistResult {
  success: boolean;
  message: string;
}

/**
 * Submit an email to the FlipShift waitlist.
 *
 * Inserts into the Supabase `waitlist` table.
 * Duplicate emails are handled gracefully (idempotent).
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

  try {
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase().trim() });

    if (error) {
      // Postgres unique violation -- email already exists
      if (error.code === "23505") {
        return {
          success: true,
          message: "You're on the list! We'll be in touch.",
        };
      }

      console.error("[Waitlist] Insert error:", error.message);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      message: "You're on the list! We'll be in touch.",
    };
  } catch (err) {
    console.error("[Waitlist] Unexpected error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

/**
 * Record the user's platform preference after waitlist signup.
 *
 * Uses upsert to update the platform column for the given email.
 */
export async function recordPlatform(
  email: string,
  platform: "android" | "ios"
): Promise<{ success: boolean }> {
  try {
    const normalizedEmail = email.toLowerCase().trim();

    const { error } = await supabase
      .from("waitlist")
      .upsert(
        { email: normalizedEmail, platform },
        { onConflict: "email" }
      );

    if (error) {
      console.error("[Waitlist] Platform update error:", error.message);
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    console.error("[Waitlist] Unexpected error:", err);
    return { success: false };
  }
}
