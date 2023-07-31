"use client";
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";

interface Artist {
  name: string;
  link: string;
  image: string;
}

export default function TopArtists(): React.JSX.Element {
  const { spotifyApi, isLoading } = useSpotify();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    (async () => {
      const response = await spotifyApi.getMyTopArtists({
        limit: 5,
        time_range: "short_term",
      });

      const artists = response.body.items.map((artist) => ({
        name: artist.name,
        link: artist.external_urls.spotify,
        image: artist.images[0]?.url,
      }));

      setTopArtists(artists);
    })();
  }, [spotifyApi, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Top Artists (Last 30 Days)</h2>
      {topArtists.map((artist, index) => (
        <div key={index}>
          <a href={artist.link} target="_blank" rel="noreferrer">
            <Image
              src={artist.image}
              alt={artist.name}
              width={60}
              height={60}
            />
            <p>{artist.name}</p>
          </a>
        </div>
      ))}
    </div>
  );
}