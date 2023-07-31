"use client";
import Nav from "@/components/Nav";
import TopSongs from "@/components/TopSongs";

export default function TopSongsPage(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TopSongs />
      </main>
    </>
  );
}
