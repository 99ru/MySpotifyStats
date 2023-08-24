"use client";
import Nav from "@/components/Nav";
import TopArtists from "@/components/TopArtists";

export default function TopArtistsPage(): React.JSX.Element {
  return (
    <div className="flex h-screen">
      <Nav />
      <main className="flex-grow flex flex-col items-center justify-between px-2 sm:px-8 py-4 overflow-y-auto">
        <TopArtists />
      </main>
    </div>
  );
}
