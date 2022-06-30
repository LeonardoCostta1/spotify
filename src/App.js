import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading";
import Home from "./pages/home";
import Menu from "./components/menu";
import Player from "./components/Player";
import Track from "./components/track";

function App() {

  return (
    <>
    <BrowserRouter>
    <Menu/>
    <React.Suspense fallback={<Loading />}>
    <div className="App">
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Track/>} />
        </Routes>
    </div>
    <Player/>
    </React.Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;
