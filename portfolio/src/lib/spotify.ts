const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

export type SpotifyTrackDisplay = {
  name: string;
  artist: string;
  cover: string;
};

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
};

type SpotifyApiTrack = {
  name: string;
  artists: { name: string }[];
  album?: { images?: { url?: string }[] };
};

type TopTracksResponse = {
  items: SpotifyApiTrack[];
};

function getCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify credentials are not configured (SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET).",
    );
  }
  return { clientId, clientSecret };
}

async function requestToken(body: URLSearchParams): Promise<TokenResponse> {
  const { clientId, clientSecret } = getCredentials();

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Spotify token request failed: ${text}`);
  }

  return response.json() as Promise<TokenResponse>;
}

/** App-only token (public catalog). Cannot read a user's top tracks. */
export async function getClientCredentialsToken(): Promise<string> {
  const data = await requestToken(
    new URLSearchParams({ grant_type: "client_credentials" }),
  );
  return data.access_token;
}

/** @deprecated Use getClientCredentialsToken or getUserAccessToken */
export async function getAccessToken(): Promise<string> {
  return getClientCredentialsToken();
}

export async function exchangeAuthorizationCode(
  code: string,
): Promise<TokenResponse> {
  const redirectUri = process.env.REDIRECT_URI;
  if (!redirectUri) {
    throw new Error("REDIRECT_URI is not configured.");
  }

  return requestToken(
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  );
}

export async function getUserAccessToken(): Promise<string> {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!refreshToken) {
    throw new Error(
      "SPOTIFY_REFRESH_TOKEN is not configured. Visit /api/login once, then add the refresh token to your environment.",
    );
  }

  const data = await requestToken(
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  );
  return data.access_token;
}

function mapTrack(track: SpotifyApiTrack): SpotifyTrackDisplay {
  return {
    name: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    cover: track.album?.images?.[0]?.url ?? "",
  };
}

export type TopTracksTimeRange = "short_term" | "medium_term" | "long_term";

/** Current user's top tracks (requires SPOTIFY_REFRESH_TOKEN from OAuth). */
export async function fetchMyTopTracks(options?: {
  limit?: number;
  timeRange?: TopTracksTimeRange;
}): Promise<SpotifyTrackDisplay[]> {
  const limit = options?.limit ?? 3;
  const timeRange = options?.timeRange ?? "medium_term";
  const token = await getUserAccessToken();

  const url = new URL(`${API_BASE}/me/top/tracks`);
  url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 50)));
  url.searchParams.set("time_range", timeRange);

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch top tracks from Spotify: ${text}`);
  }

  const data = (await response.json()) as TopTracksResponse;
  return data.items.map(mapTrack);
}
