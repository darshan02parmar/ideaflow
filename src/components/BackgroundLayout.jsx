import React from "react";
import { useLocation } from "react-router-dom";
import Hyperspeed from "./Hyperspeed";

/**
 * BackgroundLayout provides a persistent UI shell where the Hyperspeed background
 * remains mounted across route changes. It applies a conditional "dimmer" and
 * "blur" overlay when navigating away from the landing pages.
 */
export default function BackgroundLayout({ children }) {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div className="app-shell">
            {/* The Persistent Background */}
            <Hyperspeed />

            {/* Global Dimmer/Blur Overlay */}
            <div className={`background-overlay ${!isHome ? "active" : ""}`} />

            {/* Main Content Area */}
            <div className="content-root">
                {children}
            </div>
        </div>
    );
}
