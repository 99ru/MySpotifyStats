import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

export default function Nav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      <div className="flex items-center">
        <Image src="/logo.png" width={40} height={40} alt={"Logo"} />
        <div className="text-lg font-medium ml-2">My app</div>
      </div>
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/topartists">Artists</Link>
        <Link href="/topsongs">Songs</Link>
      </div>
      <div className="relative">
        {session ? (
          <Menu as="div" className="relative">
            <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <Image
                src={session.user?.image ?? "/user.png"}
                className="rounded-full object-contain"
                width={40}
                height={40}
                alt={"User Image"}
              />
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <Link href="/login"></Link>
        )}
      </div>
    </nav>
  );
}
