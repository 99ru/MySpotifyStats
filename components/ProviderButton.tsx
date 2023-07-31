'use client';
import { signIn } from "next-auth/react";
import React from "react";

export default function ProviderButton({
  id,
  name,
  callback,
}: {
  id: string;
  name: string;
  callback: string;
}): React.JSX.Element {
  const handleClick = () => {
    signIn(id, { callbackUrl: callback })
      .catch((error) => {
        console.error('Error during sign in:', error);
      });
  }

  return (
    <button
      key={name}
      className="rounded-full bg-green-500 px-4 py-2 text-xl font-semibold text-black shadow-lg shadow-gray-800 transition duration-300 hover:bg-white hover:text-black"
      onClick={handleClick}>
      Sign in with {name}
    </button>
  );
}
