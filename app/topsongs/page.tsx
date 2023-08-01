"use client";
import Nav from "@/components/Nav";
import TopSongs from "@/components/TopSongs";

export default function TopSongsPage(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between px-2 sm:px-8 py-4">
        <TopSongs />
      </main>
    </>
  );
}
