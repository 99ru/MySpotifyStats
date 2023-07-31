"use client";

import Nav from "@/components/Nav";
import TopArtists from "@/components/TopArtists";

export default function Home() {
  return (
    <div>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TopArtists />
      </main>
    </div>
  );
}
