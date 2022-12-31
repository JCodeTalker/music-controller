import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoomJoinPage } from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Room } from "./Room";
import Info from "./Info";

const App = () => {
  return (
    <BrowserRouter>
      <div className="center">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="join" element={<RoomJoinPage />} />
          <Route path="info" element={<Info />} />
          <Route path="create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
