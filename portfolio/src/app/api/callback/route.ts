import { NextResponse } from "next/server";
import { getAccessToken } from "@/app/spotify";
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
        { error: "Failed to fetch playlist tracks", details: text },
        { status: playlistRes.status }
      );
    }

    const playlistData = await playlistRes.json();

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
