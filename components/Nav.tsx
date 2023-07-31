import { signOut, useSession, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

export default function Nav(): React.JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
  };

  const handleLogin = async () => {
    await router.push("/login");
  };

  return (
    <SessionProvider>
      <nav className="flex items-center justify-between p-4 bg-black text-white">
        <div className="flex items-center">
          <Image src="/logo.png" width={40} height={40} alt={"Logo"} />
          <div className="text-lg font-medium ml-2">My app</div>
        </div>
        <div>
          {session ? (
            <>
              <div className="flex items-center">
                <Image
                  src={session.user?.image ?? "/user.png"}
                  className="rounded-full object-contain"
                  width={40}
                  height={40}
                  alt={"User Image"}
                />
                <button
                  className="py-1 px-2 ml-2 bg-green-500 text-white rounded-md transition duration-300 hover:bg-green-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button
              className="rounded-full px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-white hover:text-black"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </SessionProvider>
  );
}
