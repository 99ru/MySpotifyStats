"use client";

import Nav from "@/components/Nav";
/* import TopArtists from "@/components/TopArtists";
import TopSongs from "@/components/TopSongs"; */


export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Home page</h1>
      </main>
    </>
  );
}
