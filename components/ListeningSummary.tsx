import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";

function UserProfileStats() {
  const { spotifyApi, isLoading } = useSpotify();
  const [stats, setStats] = useState<{
    topPlays: number;
    totalPlayMinutes: number;
    avgPlaysPerDay: number;
    avgPlayMinutesPerDay: number;
  }>({
    topPlays: 0,
    totalPlayMinutes: 0,
    avgPlaysPerDay: 0,
    avgPlayMinutesPerDay: 0,
  });

  useEffect(() => {
    if (isLoading) return;

    (async () => {
      const recentlyPlayedResponse = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 });
      const recentlyPlayed = recentlyPlayedResponse.body.items;

      const topPlays = recentlyPlayed.length;
      const totalPlayMinutes = recentlyPlayed.reduce((acc, track) => acc + track.track.duration_ms, 0) / 60000; 
      const days = 30; 
      const avgPlaysPerDay = topPlays / days;
      const avgPlayMinutesPerDay = totalPlayMinutes / days;

      setStats({
        topPlays,
        totalPlayMinutes: Math.round(totalPlayMinutes),
        avgPlaysPerDay: Math.round(avgPlaysPerDay),
        avgPlayMinutesPerDay: Math.round(avgPlayMinutesPerDay),
      });
    })();
  }, [isLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card title="Top Plays" value={stats.topPlays} />
      <Card title="Total Play minutes" value={stats.totalPlayMinutes} />
      <Card title="Avg Plays per day" value={stats.avgPlaysPerDay} />
      <Card title="Avg play minutes per day" value={stats.avgPlayMinutesPerDay} />
    </div>
  );
}

interface CardProps {
  title: string;
  value: number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p>{value}</p>
    </div>
  );
};

export default UserProfileStats;
