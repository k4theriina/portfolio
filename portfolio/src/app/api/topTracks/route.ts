import { NextResponse } from "next/server";
import { fetchMyTopTracks, type TopTracksTimeRange } from "@/lib/spotify";

export const dynamic = "force-dynamic";

const VALID_TIME_RANGES: TopTracksTimeRange[] = [
  "short_term",
  "medium_term",
  "long_term",
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const timeRangeParam = searchParams.get("time_range");

    const limit = limitParam ? Number(limitParam) : 3;
    const timeRange =
      timeRangeParam &&
      VALID_TIME_RANGES.includes(timeRangeParam as TopTracksTimeRange)
        ? (timeRangeParam as TopTracksTimeRange)
        : "medium_term";

    const tracks = await fetchMyTopTracks({ limit, timeRange });
    return NextResponse.json(tracks);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    const needsAuth = message.includes("SPOTIFY_REFRESH_TOKEN");

    return NextResponse.json(
      {
        error: message,
        ...(needsAuth && {
          hint: "Visit /api/login (local dev or with SPOTIFY_ALLOW_OAUTH_SETUP=true), approve access, then set SPOTIFY_REFRESH_TOKEN in your environment.",
        }),
      },
      { status: needsAuth ? 503 : 500 },
    );
  }
}
