import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";

const App = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  return (
    <div>
      <Navbar setSidebarIsOpen={setSidebarIsOpen} />
      <Routes>
        <Route path="/" element={<Home sidebarIsOpen={sidebarIsOpen} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
