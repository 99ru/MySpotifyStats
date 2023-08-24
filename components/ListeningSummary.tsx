import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";

interface UserProfile {
  displayName: string;
  images?: { url: string }[];
  followers: number;
}

interface SongOrArtist {
  name: string;
  image: string;
  artist?: string;
}

function Dashboard() {
  const { spotifyApi, isLoading } = useSpotify();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recentSongs, setRecentSongs] = useState<SongOrArtist[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<SongOrArtist[]>([]);

  useEffect(() => {
    (async () => {
      if (isLoading) return;

      // Fetch User Profile
      const userProfileResponse = await spotifyApi.getMe();
      setProfile({
        displayName: userProfileResponse.body.display_name || "User",
        images: userProfileResponse.body.images,
        followers: userProfileResponse.body.followers?.total || 0,
      });

      // Fetch Recently Played 5 Songs
      const recentlyPlayedResponse = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 });
      const formattedSongs = recentlyPlayedResponse.body.items.map((track) => ({
        name: track.track.name,
        image: track.track.album.images[0].url,
        artist: track.track.artists[0].name,
      }));
      setRecentSongs(formattedSongs);

      // Use the recently played songs as seed tracks to get recommendations
      const seedTracks = recentlyPlayedResponse.body.items
        .map((track) => track.track.id)
        .join(",");
      const recommendationsResponse = await spotifyApi.getRecommendations({
        seed_tracks: seedTracks,
        limit: 10,
      });
      const formattedRecommendations = recommendationsResponse.body.tracks.map((track) => ({
        name: track.name,
        image: track.album.images[0].url,
        artist: track.artists[0].name,
      }));
      setRecommendedSongs(formattedRecommendations);
    })();
  }, [isLoading]);

  return (
    <div style={{ width: "100%" }}>
      {/* User Profile */}
      <div className="profile-info bg-green-600 w-full p-4 flex items-center">
        <Image
          src={profile?.images?.[0]?.url || "/default-avatar.png"}
          alt={profile?.displayName || "User"}
          className="profile-image mr-4 rounded-full"
          width={80}
          height={80}
        />
        <div>
          <h1 className="text-white">{profile?.displayName}</h1>
          <p className="text-white">{profile?.followers} Followers</p>
        </div>
      </div>

      {/* Latest 5 Songs You Listened To */}
      <div className="recent-songs p-4 text-center">
        <h2 className="text-lg font-bold mb-4">
          Recent Songs You Listened To:
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {recentSongs.map((song, index) => (
            <div key={index} className="song-card text-center w-36 sm:w-36">
              <Image
                src={song.image}
                alt={song.name}
                className="object-cover"
                width={144}
                height={144}
              />
              <div>
                <h2 className="mt-2 text-xs sm:text-sm truncate font-bold">{song.name}</h2>
                <p className="text-xs sm:text-sm truncate">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Songs */}
      <div className="recommended-songs p-4 text-center">
        <h2 className="text-lg font-bold mb-4">
          Recommended Songs Based on Your Listening History:
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {recommendedSongs.map((song, index) => (
            <div key={index} className="song-card text-center w-36 sm:w-36">
              <Image
                src={song.image}
                alt={song.name}
                className="object-cover"
                width={144}
                height={144}
              />
              <div>
                <h2 className="mt-2 text-xs sm:text-sm truncate font-bold">{song.name}</h2>
                <p className="text-xs sm:text-sm truncate">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
