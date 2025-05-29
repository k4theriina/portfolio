// script.ts

"use client";

export interface TopSong {
    songName: string;
    rank: number;
    albumCover: string;
    artistName: string;
}

const redirectUri = "http://192.168.1.156:3000/callback"; // Replace as needed

export async function redirectToAuthCodeFlow(clientId: string) {
  if (typeof window === "undefined") return;

  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "user-top-read",
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId: string, code: string): Promise<string> {
  const verifier = localStorage.getItem("verifier")!;
  const params = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await res.json();
  return access_token;
}

export async function fetchTopSongs(token: string): Promise<TopSong[]> {
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=3&offset=0", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  return data.items.map((item: any, index: number) => ({
    songName: item.name,
    rank: index + 1,
    albumCover: item.album.images[0]?.url ?? '',
    artistName: item.artists[0].name,
  }));
}

function generateCodeVerifier(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(window.crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

