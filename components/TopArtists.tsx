

import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";

interface Artist {
  name: string;
  link: string;
  image: string;
}

export default function TopArtists(): React.JSX.Element {
  const spotifyApi = useSpotify();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
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
  }, [spotifyApi]);

  return (
    <div>
      <h2>Your Top Artists (Last 30 Days)</h2>
      {topArtists.map((artist, index) => (
        <div key={index}>
          <a href={artist.link} target="_blank" rel="noreferrer">
            <Image src={artist.image} alt={artist.name} height={30} width={30} />
            <p>{artist.name}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
