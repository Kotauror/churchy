import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="links">
          <Link to="/">Mapa</Link>
          <Link to="/projekt">O projekcie</Link>
          <Link to="/tworcy">O twórcach</Link>
          <Link to="/dolacz">Dołącz</Link>
      </div>
    </footer>
  );
};
