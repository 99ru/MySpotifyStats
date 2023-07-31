'use client'
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";

interface Song {
  name: string;
  link: string;
  image: string;
  artist: string;
}

export default function TopSongs(): React.JSX.Element {
  const { spotifyApi, isLoading } = useSpotify();
  const [topSongs, setTopSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    (async () => {
      const response = await spotifyApi.getMyTopTracks({
        limit: 5,
        time_range: "short_term",
      });

      const songs = response.body.items.map((song) => ({
        name: song.name,
        link: song.external_urls.spotify,
        image: song.album.images[0]?.url,
        artist: song.artists[0]?.name,
      }));

      setTopSongs(songs);
    })();
  }, [spotifyApi, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Top Songs (Last 30 Days)</h2>
      {topSongs.map((song, index) => (
        <div key={index}>
          <a href={song.link} target="_blank" rel="noreferrer">
            <Image src={song.image} alt={song.name} height={60} width={60}  />
            <p>{song.name} by {song.artist}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
