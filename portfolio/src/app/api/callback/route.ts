// app/api/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

let access_token = '';

export function getAccessToken() {
  return access_token;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirect_uri = process.env.REDIRECT_URI!;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code || '',
        redirect_uri,
        client_id,
        client_secret,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    access_token = response.data.access_token;

    return NextResponse.redirect(new URL('/top-songs', req.url));
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
