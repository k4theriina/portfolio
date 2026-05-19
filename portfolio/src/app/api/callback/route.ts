import { NextResponse } from "next/server";
import { exchangeAuthorizationCode } from "@/lib/spotify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");
  const code = searchParams.get("code");

  if (error) {
    return NextResponse.json(
      { error: "Spotify authorization denied", details: error },
      { status: 400 },
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code from Spotify" },
      { status: 400 },
    );
  }

  try {
    const tokens = await exchangeAuthorizationCode(code);

    if (!tokens.refresh_token) {
      return NextResponse.json(
        {
          error: "No refresh token returned",
          hint: "Revoke this app in your Spotify account settings, then visit /api/login again.",
        },
        { status: 502 },
      );
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Spotify connected</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    code, pre { background: #1a1a1a; color: #eee; padding: 0.75rem 1rem; border-radius: 8px; display: block; overflow-x: auto; word-break: break-all; }
    h1 { font-size: 1.25rem; }
  </style>
</head>
<body>
  <h1>Spotify connected</h1>
  <p>Add this to <code>.env.local</code> (then restart the dev server):</p>
  <pre>SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}</pre>
  <p>Your About page will load top tracks from <code>/v1/me/top/tracks</code> instead of a playlist.</p>
  <p><a href="/about">Go to About</a></p>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Token exchange failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
