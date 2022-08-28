import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    (async () => {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    })();
  }, []);

  function renderHomePage() {
    if (roomCode) {
      return <Navigate to={`/room/${roomCode}`} replace />;
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              House Party
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="secondary" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      );
    }
  }

  return renderHomePage();
}
