"use server";

import { supabase } from "@/lib/supabase";
import { isAllowedEmailDomain } from "@/lib/email-domains";

interface WaitlistResult {
  success: boolean;
  message: string;
  alreadyExists?: boolean;
}


export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      message: "Please use a valid email address.",
    };
  }

  if (!isAllowedEmailDomain(email)) {
    return {
      success: false,
      message: "Please use a real email address",
    };
  }

  try {
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase().trim() });

    if (error) {
      if (error.code === "23505") {
        return {
          success: false,
          alreadyExists: true,
          message: "This email is already on the waitlist.",
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


export async function recordPlatform(
  email: string,
  platform: "android" | "ios"
): Promise<{ success: boolean }> {
  try {
    const { error } = await supabase.rpc("update_waitlist_platform", {
      p_email: email.toLowerCase().trim(),
      p_platform: platform,
    });

    if (error) {
      console.error("[Waitlist] Platform update error:", error.message, error.code);
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    console.error("[Waitlist] Unexpected error:", err);
    return { success: false };
  }
}

