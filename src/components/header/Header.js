import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <span
      role="img"
      aria-label="movie"
      className="header"
      onClick={() => window.scroll(0, 0)}
    >
      🍿 Movies Scout 🎥
    </span>
  );
};

export default Header;
