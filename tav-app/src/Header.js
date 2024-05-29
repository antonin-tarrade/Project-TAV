import React from "react";
import "./Header.css";

function Header () {
    return (
        <header className="header">
            <div className="main-logo header-logo"> TAV </div>
            <h1>Rapport de TAV</h1>
            <a href="/" className="about-link">A propos</a>
        </header>
    );
}

export default Header;