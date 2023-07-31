import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { UserSession } from "@/utils/models";

const spotifyApi = new SpotifyWebApi({
    clientId: String(process.env.SPOTIFY_CLIENT_ID),
    clientSecret: String(process.env.SPOTIFY_CLIENT_SECRET),
    redirectUri: String(process.env.NEXTAUTH_URL) + "/api/auth/callback/spotify",
});

export default function useSpotify(): { spotifyApi: SpotifyWebApi; isLoading: boolean; } {
    const { data: session } = useSession() as { data: UserSession };
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            if (session.error === "RefreshAccessTokenError") {
                signIn();
            }
            const token = session?.user?.token?.accessToken;
            console.log('Setting Spotify access token:', token);
            spotifyApi.setAccessToken(token ?? "");
            setLoading(false);
        }
    }, [session]);

    return { spotifyApi, isLoading };
}
