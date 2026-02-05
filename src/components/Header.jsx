import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LogoIcon = () => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="32" height="32" rx="8" fill="#F97316" />
        <path
            d="M10 10V22M10 16H18C20.2091 16 22 14.2091 22 12C22 9.79086 20.2091 8 18 8H10M10 22L22 22"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const MenuIcon = () => (
    <svg className="icon-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg className="icon-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function Header({ onSubmit, setInput, inputValue }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Conditionals for dynamic header behavior
    const isHome = location.pathname === "/";
    const isResultsPage = location.pathname.startsWith("/search/");

    const navItems = [
        { name: "Home", path: "/" },
        { name: "How it works", path: "/how-it-works" },
        { name: "Examples", path: "/examples" },
        { name: "Why IdeaFlow", path: "/why-ideaflow" },
        { name: "Saved Ideas", path: "/saved" },
    ];

    const scrollToInput = () => {
        if (isHome) {
            const input = document.getElementById("hero-search-input");
            if (input) {
                input.scrollIntoView({ behavior: "smooth", block: "center" });
                setTimeout(() => input.focus(), 500);
            }
        } else {
            navigate("/");
            setTimeout(() => {
                const input = document.getElementById("hero-search-input");
                if (input) {
                    input.scrollIntoView({ behavior: "smooth", block: "center" });
                    setTimeout(() => input.focus(), 500);
                }
            }, 100);
        }
    };

    return (
        <header className={`qupe-header ${!isHome ? "compact" : ""}`}>
            <div className="header-container">
                <Link className="brand" to="/">
                    <LogoIcon />
                    <span className="brand-text">IdeaFlow</span>
                </Link>
                
                {/* Compact search only shows on Results/Search page */}
                {isResultsPage && (
                    <div className="compact-input-container">
                        <input
                            className="qupe-input compact"
                            placeholder="Describe another idea..."
                            value={inputValue}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onSubmit(e.target.value);
                            }}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                )}
                 &nbsp; &nbsp;
                <nav className="desktop-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                    &nbsp; &nbsp;
                <div className="header-actions">
                    <button className="btn-primary-header hide-mobile" onClick={scrollToInput}>Get started - for free</button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="show-mobile menu-toggle"
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
                <div className="mobile-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`mobile-link ${location.pathname === item.path ? "active" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button className="btn-primary-header w-full" onClick={() => { setIsMenuOpen(false); scrollToInput(); }}>Get started - for free</button>
                </div>
            </div>
        </header>
    );
}
