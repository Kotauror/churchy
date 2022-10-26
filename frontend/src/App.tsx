import React from 'react';
import './App.css';
import { MapWrapper } from './components/MapWrapper';
// import useScript from './hooks/useScript';

function App() {
  // useScript("https://unpkg.com/leaflet@1.3.1/dist/leaflet.js");
  // useScript(
  //   "https://cdn.jsdelivr.net/npm/leaflet-textpath@1.2.0/leaflet.textpath.min.js"
  // );
  return (
    <div className="App">
      <MapWrapper />
    </div>
  );
}

export default App;
