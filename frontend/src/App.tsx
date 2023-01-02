import React from "react";
import "./App.css";
import { MapWrapper } from "./components/MapWrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Creators } from "./components/Creators";
import { Layout } from "./components/Layout"
import { AboutProject } from "./components/AboutProject";
import { JoinUs } from "./components/JoinUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <div className="App">
                <MapWrapper />
               </div>
            }
          />
          <Route path="tworcy" element={<Creators />} />
          <Route path="projekt" element={<AboutProject />} />
          <Route path="dolacz" element={<JoinUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
