import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoomJoinPage } from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Room } from "./Room";

export default function HomePage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<p>home page</p>} />
        <Route path="join" element={<RoomJoinPage />} />
        <Route path="create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}
