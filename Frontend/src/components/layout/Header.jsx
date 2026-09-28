import React from "react";
import TopBar from "./TopBar.jsx"
import NavBar from "./NavBar.jsx"

function Header() {
    return (
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            <TopBar />
            <NavBar />
        </div>
    );
}

export default Header;