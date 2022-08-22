import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMatch } from "react-router-dom";

export function Room() {
  const match = useMatch("/room/:roomCode");
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPauseChange] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    fetch("/api/get-room" + "?code=" + match.params.roomCode)
      .then((response) => response.json())
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPauseChange(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }, []);

  return match ? (
    <div>
      <p> {match.params.roomCode} </p>
      <p>votes to skip: {votesToSkip}</p>
      <p>g can pause: {guestCanPause.toString()}</p>
      <p>host: {isHost.toString()} </p>
    </div>
  ) : (
    <div>Uncool</div>
  );
}
