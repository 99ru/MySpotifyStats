import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlinePerson } from "react-icons/md";
import { BiMusic } from "react-icons/bi";

export default function Nav() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="flex flex-col w-60 sm:w-16 md:w-60 h-screen bg-black text-white p-4 flex-shrink-0">
      <div className="flex items-center mb-4">
        <Image src="/logo.png" width={40} height={40} alt={"Logo"} />
        <div className="text-3xl sm:text-xl md:text-3xl font-medium ml-2">MyStats</div>
      </div>
      <div className="flex flex-col space-y-4 mt-4 text-2xl sm:text-xl md:text-2xl">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <AiOutlineHome />
            <span className="hidden sm:inline md:inline">Home</span>
          </div>
        </Link>
        <Link href="/topartists">
          <div className="flex items-center space-x-2">
            <MdOutlinePerson />
            <span className="hidden sm:inline md:inline">Artists</span>
          </div>
        </Link>
        <Link href="/topsongs">
          <div className="flex items-center space-x-2">
            <BiMusic />
            <span className="hidden sm:inline md:inline">Songs</span>
          </div>
        </Link>
      </div>
      <div className="mt-auto relative">
        {session ? (
          <Menu as="div" className="relative">
            <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <Image
                src={session.user?.image ?? "/user.png"}
                className="rounded-full object-contain"
                width={60}
                height={60}
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
              <Menu.Items className="absolute w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 bottom-full right-0">
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
