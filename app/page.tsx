"use client";
import Nav from "@/components/Nav";
import ListeningSummary from "@/components/ListeningSummary";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Nav/> 
      <main className="flex-grow overflow-y-auto">
        <ListeningSummary />
      </main>
    </div>
  );
}

