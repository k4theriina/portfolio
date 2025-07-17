// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const scope = 'user-top-read';
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const redirect_uri = process.env.REDIRECT_URI!;

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  return NextResponse.redirect(authUrl);
}
