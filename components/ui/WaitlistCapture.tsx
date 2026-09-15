"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import SocialProof from "./SocialProof";
import { submitWaitlist, recordPlatform } from "@/app/actions/waitlist";
import { isAllowedEmailDomain } from "@/lib/email-domains";

interface WaitlistCaptureProps {
  variant?: "dark" | "light";
  className?: string;
  id?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error" | "already-exists";

export default function WaitlistCapture({
  variant = "dark",
  className = "",
  id,
}: WaitlistCaptureProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [platform, setPlatform] = useState<"android" | "ios" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const isDark = variant === "dark";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isAllowedEmailDomain(email)) {
      setState("error");
      setErrorMessage("Please use a personal email (e.g. Gmail, Outlook, iCloud).");
      return;
    }

    setState("loading");

    try {
      const result = await submitWaitlist(email);
      if (result.success) {
        setState("success");
      } else if (result.alreadyExists) {
        setState("already-exists");
      } else {
        setState("error");
        setErrorMessage(result.message);
      }
    } catch {
      setState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handlePlatformSelect = async (selected: "android" | "ios") => {
    setPlatform(selected);
    // Fire and forget -- don't block the UI for this
    recordPlatform(email, selected).catch(() => {});
  };

  const handleRetry = () => {
    setState("idle");
    setErrorMessage("");
  };

  return (
    <div id={id} className={`w-full max-w-lg ${className}`}>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <AnimatePresence mode="wait">
            {!platform ? (
              /* Phase 1: Platform question */
              <motion.div
                key="platform-question"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {/* Confirmed row */}
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-5 h-5 text-seagrass flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`font-sans font-semibold text-sm ${isDark ? "text-cream" : "text-slate-grey"}`}>
                    You&apos;re on the list. One more thing:
                  </span>
                </div>

                <p className={`font-sans text-xs mb-3 ${isDark ? "text-cream/60" : "text-mauve"}`}>
                  Which platform are you on?
                </p>

                <div className="flex gap-2.5 flex-wrap">
                  {/* Android Button */}
                  <button
                    id="waitlist-platform-android"
                    onClick={() => handlePlatformSelect("android")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-medium
                      border transition-all duration-150 cursor-pointer select-none
                      ${isDark
                        ? "bg-white/6 border-cream/15 text-cream/80 hover:bg-white/12 hover:border-cream/30 hover:text-cream"
                        : "bg-slate-grey/5 border-slate-grey/15 text-slate-grey/70 hover:bg-slate-grey/10 hover:border-slate-grey/30 hover:text-slate-grey"
                      }
                    `}
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.18 15.64a2.18 2.18 0 0 1-2.18-2.18V9.77a2.18 2.18 0 1 1 4.36 0v3.69a2.18 2.18 0 0 1-2.18 2.18zm11.64 0a2.18 2.18 0 0 1-2.18-2.18V9.77a2.18 2.18 0 1 1 4.36 0v3.69a2.18 2.18 0 0 1-2.18 2.18zM15.79 3.07l1.24-1.85a.26.26 0 0 0-.43-.29l-1.28 1.9A6.67 6.67 0 0 0 12 2.29c-.94 0-1.84.18-2.66.51L8.06.9a.26.26 0 1 0-.43.29L8.87 3.1A6.68 6.68 0 0 0 5.33 8.6h13.33a6.68 6.68 0 0 0-2.87-5.53zM9.77 6.43a.77.77 0 1 1 .77-.77.77.77 0 0 1-.77.77zm4.46 0a.77.77 0 1 1 .77-.77.77.77 0 0 1-.77.77zM5.33 9.57v8.46a1.54 1.54 0 0 0 1.54 1.54h.77V22a1.54 1.54 0 1 0 3.08 0v-2.43h2.57V22a1.54 1.54 0 1 0 3.08 0v-2.43h.77a1.54 1.54 0 0 0 1.54-1.54V9.57z" />
                    </svg>
                    Android
                  </button>

                  {/* iPhone Button */}
                  <button
                    id="waitlist-platform-ios"
                    onClick={() => handlePlatformSelect("ios")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-medium
                      border transition-all duration-150 cursor-pointer select-none
                      ${isDark
                        ? "bg-white/6 border-cream/15 text-cream/80 hover:bg-white/12 hover:border-cream/30 hover:text-cream"
                        : "bg-slate-grey/5 border-slate-grey/15 text-slate-grey/70 hover:bg-slate-grey/10 hover:border-slate-grey/30 hover:text-slate-grey"
                      }
                    `}
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
                      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-155.5-127.2C46.7 790.7 0 663 0 541.8c0-207.8 135.4-317.5 268.5-317.5 99.8 0 183 65.8 245.3 65.8 59.2 0 152-69.1 271.5-69.1zm-174.2-209.1c31.4-37.9 54.3-90.4 54.3-142.9 0-7.1-.6-14.3-1.9-20.1-51.5 1.9-110.8 34.4-147.1 75.8-28.5 32.4-55.1 84.9-55.1 138.3 0 7.7 1.3 15.5 1.9 18s9.6 1.3 14.3 1.3c46.4 0 100.2-31.2 133.6-70.4z" />
                    </svg>
                    iPhone
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Phase 2: Final confirmation — buttons gone, just a single line */
              <motion.div
                key="platform-confirmed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-seagrass flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className={`font-sans text-sm font-medium ${isDark ? "text-cream" : "text-slate-grey"}`}>
                  Got it. We&apos;ll prioritize{" "}
                  <span className="text-seagrass">{platform === "ios" ? "iPhone" : "Android"}</span>{" "}
                  and reach out when we&apos;re ready.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="waitlist-email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="you@example.com"
                aria-label="Email address"
                className={`
                  flex-1 px-4 sm:px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm
                  transition-smooth outline-none
                  ${
                    isDark
                      ? "bg-white/10 text-cream placeholder:text-cream/40 border border-cream/10 focus:border-seagrass focus:bg-white/15"
                      : "bg-slate-grey/5 text-slate-grey placeholder:text-mauve/50 border border-slate-grey/10 focus:border-seagrass focus:bg-white"
                  }
                  ${state === "error" ? "border-amber-300/80" : ""}
                `}
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={state === "loading"}
                id="waitlist-submit-button"
                className="whitespace-nowrap !py-2.5 !px-4 !text-xs !rounded-full"
              >
                {state === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  "Join the waitlist"
                )}
              </Button>
            </div>

            {state === "already-exists" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-seagrass flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className={`text-xs ${isDark ? "text-cream/70" : "text-slate-grey/70"}`}>
                  You&apos;re already on the waitlist.
                </span>
              </motion.div>
            )}

            {state === "error" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 flex items-center gap-2"
              >
                <span className="text-amber-200 text-xs">{errorMessage}</span>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="text-xs text-seagrass underline underline-offset-2 hover:text-seagrass-light cursor-pointer"
                >
                  Retry
                </button>
              </motion.div>
            )}

            <p
              className={`text-[11px] sm:text-xs mt-2 ${isDark ? "text-cream/45" : "text-mauve/65"}`}
            >
              Get early access and founding pricing. No spam, ever.
            </p>

            <SocialProof variant={variant} className="mt-3" />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
