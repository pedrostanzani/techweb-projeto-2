import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Zap, Check } from "lucide-react";

import playlist from "@/services/playlists";
import moods from "@/constants/moods";
import spotify from "@/constants/spotify";

import SpotifyIcon from "@/assets/spotify.png";

import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import ErrorCard from "@/components/error-card";
import Container from "@/components/container";
import Track from "@/components/track";
import Spinner from "@/components/spinner";

import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";

export function ToastDestructive() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }}
    >
      Show Toast
    </Button>
  );
}

const buildSpotifyUrl = () => {
  const scope =
    "user-read-private user-read-email user-library-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private";

  const params = {
    client_id: spotify.id,
    response_type: "code",
    redirect_uri: spotify.redirectUri,
    scope: scope,
    show_dialog: true,
  };

  const encodedSearchParams = new URLSearchParams(params).toString();

  return `https://accounts.spotify.com/authorize/?${encodedSearchParams}`;
};

const CheckOrAdd = ({ hasAdded }) => {
  if (hasAdded) {
    return <Check />;
  }

  return (
    <>
      <span>Add to Spotify</span>
      <img className="w-5" src={SpotifyIcon} alt="Spotify." />
    </>
  );
};

const Mood = () => {
  const navigate = useNavigate();

  const { mood: slug } = useParams();
  const mood = moods.filter((mood) => mood.slug === slug)[0];

  const spotifyUrl = buildSpotifyUrl();

  if (!mood) {
    return <div></div>;
  }

  const [hasAdded, setHasAdded] = useState(false);
  const [showAddToSpotifyButton, setShowAddToSpotifyButton] = useState(false);
  const [addToSpotifyIsLoading, setAddToSpotifyIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [tracks, setTracks] = useState(null);
  const effectCalled = useRef(false);

  useEffect(() => {
    if (effectCalled.current) return;
    effectCalled.current = true;

    const destinationMood = window.localStorage.getItem("mood");
    console.log(destinationMood);

    if (!destinationMood) {
      playlist
        .get(mood.slug)
        .then((data) => {
          setTracks(data.tracks);
          setShowAddToSpotifyButton(true);
        })
        .catch((error) => {
          setShowError(true);
        });
    } else {
      if (destinationMood !== mood.slug) {
        // Mood mismatch
        console.log("Mood mismatch.", destinationMood, mood);
        window.localStorage.clear();
        navigate("/");
        return;
      }

      // In case that there is a destinationMood and it's the same as the page's mood,
      // then the playlist will get rebuilt. Here's how:
      const dumpedTracks = window.localStorage.getItem("tracks");
      if (!dumpedTracks) {
        console.log("No dumped tracks.");
        window.localStorage.clear();
        navigate("/");
        return;
      }

      let _tracks;

      try {
        _tracks = JSON.parse(dumpedTracks);
      } catch (error) {
        console.log("Parse error.");
        window.localStorage.clear();
        navigate("/");
        return;
      }

      setTracks(_tracks);
      setShowAddToSpotifyButton(true);
      window.localStorage.removeItem("mood");
      window.localStorage.removeItem("tracks");
    }
  }, []);

  const handleAddToSpotify = () => {
    if (addToSpotifyIsLoading) {
      return;
    }

    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) {
      setAddToSpotifyIsLoading(true);
      playlist
        .createAndAddToSpotify(
          slug,
          tracks.map((track) => track.id),
          accessToken,
        )
        .then((response) => {
          console.log(response.data);
          setHasAdded(true);
        })
        .catch((error) => {
          console.log(error);
          // This is very likely to be an authentication error.
          // In this case, we must log the user out and show an error message.
          window.localStorage.removeItem("access_token");
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request. Please try again.",
          });
        })
        .finally(() => {
          setAddToSpotifyIsLoading(false);
        });
    } else {
      window.localStorage.setItem("mood", slug);
      window.localStorage.setItem("tracks", JSON.stringify(tracks));
      window.location.replace(spotifyUrl);
    }
  };

  return (
    <Container>
      <Breadcrumbs name={mood.name} />
      <div className="mb-2.5 flex flex-row items-center gap-2.5">
        <mood.icon className={mood.color} size={44} />
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          {mood.name}
        </h1>
      </div>
      <p className="mb-5 text-neutral-400">
        Generated by AI and seeded with Moody's curation of tracks.
      </p>

      {showAddToSpotifyButton ? (
        <div className="mb-4 flex flex-row justify-start">
          <Button
            className="flex flex-row gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90"
            onClick={handleAddToSpotify}
          >
            {addToSpotifyIsLoading ? (
              <Spinner />
            ) : (
              <CheckOrAdd hasAdded={hasAdded} />
            )}
          </Button>
        </div>
      ) : null}

      {showError ? (
        <ErrorCard />
      ) : (
        <>
          {tracks ? (
            <div className="rounded-md bg-[#101010] pb-8 [&>*:nth-child(even)]:bg-[#171717] hover:[&>*:nth-child(even)]:bg-[#1D1D1D] hover:[&>*:nth-child(odd)]:bg-[#1D1D1D]">
              {tracks.map((track, i) => (
                <Track key={track.id} track={track} songId={i + 1} />
              ))}
            </div>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default Mood;
