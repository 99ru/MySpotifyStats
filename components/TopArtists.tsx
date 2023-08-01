"use client";
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";
import Link from "next/link";
import { TimeRange } from "./TimeRange";

interface Artist {
  name: string;
  image: string;
  uri: string;
}

export default function TopArtists(): React.JSX.Element {
  const { spotifyApi, isLoading } = useSpotify();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");

  useEffect(() => {
    if (isLoading) {
      return;
    }

    (async () => {
      const response = await spotifyApi.getMyTopArtists({
        limit: 30,
        time_range: timeRange,
      });

      const artists = response.body.items.map((artist) => ({
        name: artist.name,
        image: artist.images[0]?.url,
        uri: artist.uri,
      }));

      setTopArtists(artists);
    })();
  }, [spotifyApi, isLoading, timeRange]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
  <div className="flex flex-col items-center">
    <h2 className="mb-6 text-2xl sm:text-4xl">Your Top Artists</h2>
    <TimeRange setTimeRange={setTimeRange} />
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topArtists.map((artist, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center"
        >
          <Link href={artist.uri}>
            <div className="w-24 h-24 sm:w-36 sm:h-36 relative">
              <Image
                src={artist.image}
                alt={artist.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </Link>
          <p className="text-sm sm:text-base">
            {index + 1}. {artist.name}
          </p>
          <Link href={artist.uri}>
            <Image
              src="/logo.png"
              alt="Spotify Logo"
              width={14}
              height={14}
              className="sm:w-18 sm:h-18"
            />
          </Link>
        </div>
      ))}
    </div>
  </div>
);

}
