import { NextResponse } from "next/server";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get access token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const playlistId = "4fd1FQ2iNC8NMl8q25qmyp";

    const playlistRes = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!playlistRes.ok) {
      const text = await playlistRes.text();
      return NextResponse.json(
        { error: "Failed to fetch playlist tracks from Spotify", details: text },
        { status: playlistRes.status }
      );
    }

    const playlistData = await playlistRes.json();

    // Build final tracks array with only name, artist, and cover
    const tracks = playlistData.items.map((item: any) => {
      const track = item.track;
      return {
        name: track.name,
        artist: track.artists.map((a: any) => a.name).join(", "),
        cover: track.album.images[0]?.url ?? "",
      };
    });

    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
