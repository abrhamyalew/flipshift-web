"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface WaitlistCaptureProps {
  variant?: "dark" | "light";
  className?: string;
  id?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

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

    setState("loading");

    // Simulate API call - will be replaced with Server Action to NestJS
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setState("success");
    } catch {
      setState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleRetry = () => {
    setState("idle");
    setErrorMessage("");
  };

  return (
    <div id={id} className={`w-full max-w-lg ${className}`}>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg
                className="w-6 h-6 text-seagrass"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span
                className={`font-sans font-semibold text-lg ${isDark ? "text-cream" : "text-slate-grey"}`}
              >
                You&apos;re on the list!
              </span>
            </div>

            <p
              className={`text-sm mb-6 ${isDark ? "text-cream/70" : "text-mauve"}`}
            >
              We&apos;ll let you know when FlipShift is ready. One more thing:
            </p>

            <p
              className={`font-sans font-medium text-sm mb-4 ${isDark ? "text-cream/90" : "text-slate-grey"}`}
            >
              Which platform are you on?
            </p>

            <div className="flex gap-3 justify-center">
              <Button
                variant={platform === "android" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setPlatform("android")}
                id="waitlist-platform-android"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.34a1 1 0 01-.006-1.414c.63-.632.953-1.403.953-2.223 0-1.78-1.637-3.343-4.066-3.897a.75.75 0 01.333-1.462c3.12.712 5.233 2.84 5.233 5.359 0 1.17-.462 2.27-1.33 3.17a1 1 0 01-1.418.065l.301.402zm-5.523.66c-3.038 0-5.5-1.828-5.5-4.083 0-1.17.462-2.27 1.33-3.17a1 1 0 011.418-.065.999.999 0 01.006 1.413C8.624 10.728 8.3 11.5 8.3 12.317c0 1.377 1.676 2.583 3.7 2.583s3.7-1.206 3.7-2.583a.75.75 0 011.5 0c0 2.255-2.462 4.083-5.5 4.083h-.2.2zM6.5 4l1.3 2.5h8.4L17.5 4M15 21h-2v-4.5a1.5 1.5 0 00-3 0V21H8a1 1 0 01-1-1v-8h10v8a1 1 0 01-1 1z" />
                </svg>
                Android
              </Button>
              <Button
                variant={platform === "ios" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setPlatform("ios")}
                id="waitlist-platform-ios"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                iOS
              </Button>
            </div>

            {platform && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-seagrass text-sm mt-4 font-medium"
              >
                Got it, thanks! We&apos;ll prioritize {platform === "ios" ? "iOS" : "Android"}.
              </motion.p>
            )}
          </motion.div>
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
                  flex-1 px-6 py-3.5 rounded-full font-sans text-base
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
                size="md"
                disabled={state === "loading"}
                id="waitlist-submit-button"
                className="whitespace-nowrap"
              >
                {state === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
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

            {state === "error" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 flex items-center gap-2"
              >
                <span className="text-amber-200 text-sm">{errorMessage}</span>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="text-sm text-seagrass underline underline-offset-2 hover:text-seagrass-light cursor-pointer"
                >
                  Retry
                </button>
              </motion.div>
            )}

            <p
              className={`text-sm mt-3 ${isDark ? "text-cream/50" : "text-mauve/70"}`}
            >
              Get early access and founding pricing. No spam, ever.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
