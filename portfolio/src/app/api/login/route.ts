import { NextResponse } from "next/server";

export async function GET() {
  const scope = "user-top-read";
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "SPOTIFY_CLIENT_ID and REDIRECT_URI must be set (e.g. REDIRECT_URI=http://localhost:3000/api/callback).",
      },
      { status: 503 },
    );
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    show_dialog: "true",
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
  );
}
