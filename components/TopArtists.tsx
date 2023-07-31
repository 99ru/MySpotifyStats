"use client";
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";
import Link from "next/link";
import { TimeRange } from './TimeRange';

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
      <h2 className="mb-6 text-4xl" >Your Top Artists</h2>
      <TimeRange setTimeRange={setTimeRange} />
      <div className="grid grid-cols-3 gap-4">
        {topArtists.map((artist, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <Link href={artist.uri}>
              <Image
                src={artist.image}
                alt={artist.name}
                width={140}
                height={140}
                objectFit="cover"
                priority={true}
              />
            </Link>
           <p>
        {index + 1}. {artist.name}
      </p>
          </div>
        ))}
      </div>
    </div>
  );
}
