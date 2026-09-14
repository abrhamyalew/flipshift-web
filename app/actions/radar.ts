"use server";

export interface RadarStatus {
  status: "sleeping" | "awake";
  until: string;
  energyLevel: number;
  energyLabel: string;
  nextFreeWindow: {
    start: string;
    end: string;
  };
  name: string;
}

/**
 * Fetch the Spouse Radar status for a given user.
 *
 * Currently a mock implementation. In production, this will proxy
 * to the NestJS backend via:
 *   GET /api/radar/:userId
 *
 * Expected NestJS contract:
 *   - 200: RadarStatus
 *   - 404: { error: "user_not_found" }
 *   - 403: { error: "radar_disabled" }
 */
export async function getRadarStatus(userId: string): Promise<RadarStatus> {
  // Mock: simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock data based on current hour
  const hour = new Date().getHours();
  const isSleeping = hour >= 22 || hour < 7;

  console.log(`[Radar] Status check for user: ${userId}`);

  return {
    name: "Alex",
    status: isSleeping ? "sleeping" : "awake",
    until: isSleeping ? "6:30 AM" : "10:00 PM",
    energyLevel: isSleeping ? 75 : 60,
    energyLabel: isSleeping ? "Good" : "Moderate",
    nextFreeWindow: {
      start: "10:00 AM",
      end: "2:00 PM",
    },
  };
}
