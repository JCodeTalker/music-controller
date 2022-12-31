import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export function Room() {
  const match = useMatch("/room/:roomCode");
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [song, setSong] = useState(false);
  const [guestCanPause, setGuestCanPauseChange] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticate] = useState(false);
  const navigate = useNavigate();
  getCurrentSong();
  useEffect(() => {
    fetch("/api/get-room" + "?code=" + match.params.roomCode)
      .then((response) => {
        if (!response.ok) {
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPauseChange(data.guest_can_pause);
        setIsHost(data.is_host);
        if (data.is_host) authenticateSpotify();
      });
  }, [updatePage]);

  function getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (response.statusText !== "OK") {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
      });
  }

  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticate(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      navigate("/");
    });
  }

  function renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  function renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={match.params.roomCode}
            updateCallBack={() => setUpdatePage(!updatePage)}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      {!showSettings ? (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {match.params.roomCode}
            </Typography>
          </Grid>
          {song && <MusicPlayer song={{ ...song }}></MusicPlayer>}
          {isHost && renderSettingsButton()}
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>
      ) : (
        renderSettings()
      )}
    </>
  );
}
