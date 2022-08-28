// import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoomJoinPage } from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Room } from "./Room";

const App = () => {
  return (
    <BrowserRouter>
      <div className="center">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="join" element={<RoomJoinPage />} />
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
