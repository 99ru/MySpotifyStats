"use client";
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";
import Link from "next/link";
import { TimeRange } from "./TimeRange";

interface Song {
  name: string;
  link: string;
  image: string;
  artist: string;
}

export default function TopSongs(): React.JSX.Element {
  const { spotifyApi, isLoading } = useSpotify();
  const [topSongs, setTopSongs] = useState<Song[]>([]);
  const [timeRange, setTimeRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");

  useEffect(() => {
    if (isLoading) {
      return;
    }

    (async () => {
      const response = await spotifyApi.getMyTopTracks({
        limit: 30,
        time_range: timeRange,
      });

      const songs = response.body.items.map((song) => ({
        name: song.name,
        link: song.external_urls.spotify,
        image: song.album.images[0]?.url,
        artist: song.artists[0]?.name,
      }));

      setTopSongs(songs);
    })();
  }, [spotifyApi, isLoading, timeRange]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-6 text-4xl">Your Top Songs</h2>
      <TimeRange setTimeRange={setTimeRange} />
      <div className="w-full">
        {topSongs.map((song, index) => (
          <div key={index} className="flex items-start gap-4 mb-4">
            <div className="flex items-center">
              <div className="text-lg font-bold text-gray-500 mr-2">
                {index + 1}.
              </div>
              <Link href={song.link}>
                <div className="w-12 h-12 sm:w-12 sm:h-12 relative">
                  <Image
                    src={song.image}
                    alt={song.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              </Link>
            </div>
            <div className="flex-grow">
              <p className="font-bold">{song.name}</p>
              <div className="flex items-center">
                <p className="mr-2">{song.artist}</p>
                <Link href={song.link}>
                  <Image
                    src="/logo2.png"
                    alt="Spotify Logo"
                    width={16}
                    height={16}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
