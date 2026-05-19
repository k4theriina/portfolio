import { NextResponse } from "next/server";
import { isOAuthSetupEnabled } from "@/lib/site";

export function oauthSetupDisabledResponse() {
  return NextResponse.json(
    {
      error: "Spotify OAuth setup is disabled in production.",
      hint: "Set SPOTIFY_ALLOW_OAUTH_SETUP=true temporarily to re-authorize, or run /api/login locally.",
    },
    { status: 404 },
  );
}

export function assertOAuthSetupEnabled(): NextResponse | null {
  if (!isOAuthSetupEnabled()) {
    return oauthSetupDisabledResponse();
  }
  return null;
}
