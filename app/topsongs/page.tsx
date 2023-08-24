"use client";
import Nav from "@/components/Nav";
import TopSongs from "@/components/TopSongs";

export default function TopSongsPage(): React.JSX.Element {
  return (
    <div className="flex h-screen">
      <Nav />
      <main className="flex-grow flex flex-col items-center justify-between px-2 sm:px-8 py-4 overflow-y-auto">
        <TopSongs />
      </main>
    </div>
  );
}
