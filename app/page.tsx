"use client";
import Nav from "@/components/Nav";
import ListeningSummary from "@/components/ListeningSummary";


export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ListeningSummary />
      </main>
    </>
  );
}
