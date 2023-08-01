"use client";
import Nav from "@/components/Nav";
import TopArtists from "@/components/TopArtists";

export default function TopArtistsPage(): React.JSX.Element {
return (
  <>
    <Nav />
    <main className="flex min-h-screen flex-col items-center justify-between px-2 sm:px-8 py-4">
      <TopArtists />
    </main>
  </>
);

}
