import React from "react";
import "../css/Header.css";

function Header() {
  return (
    <div className="header">
      <img
        className="header-logo"
        src="https://geektrust.sgp1.cdn.digitaloceanspaces.com/assets/images/logo-geektrust-hub-green.png"
      />
      <span>Admin UI Challenge</span>
    </div>
  );
}

export default Header;
