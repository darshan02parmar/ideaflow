import React, { useState } from "react";

const LogoIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6 6H10V10H6V6Z" fill="#F97316" />
        <path d="M14 6H18V10H14V6Z" fill="#F97316" />
        <path d="M6 14H10V18H6V14Z" fill="#F97316" />
        <path d="M14 14H18V18H14V14Z" fill="#F97316" fillOpacity="0.5" />
    </svg>
);

const MenuIcon = () => (
    <svg
        className="icon-w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
        />
    </svg>
);

const CloseIcon = () => (
    <svg
        className="icon-w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export default function Hero({ onSubmit, setInput, inputValue, isCompact }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = ["About", "Features", "Blog", "Pricing", "Contact"];

    if (isCompact) {
        return (
            <header className="qupe-header compact">
                <div className="header-container">
                    <div className="brand">
                        <LogoIcon />
                        <span className="brand-text">IdeaFlow</span>
                    </div>
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
                </div>
            </header>
        );
    }

    return (
        <div className="qupe-wrapper">
            {/* Background Orbs */}
            <div className="orb orb-top"></div>
            <div className="orb orb-bottom"></div>

            <header className="qupe-header">
                <div className="header-container">
                    <div className="brand">
                        <LogoIcon />
                        <span className="brand-text">IdeaFlow</span>
                    </div>

                    <nav className="desktop-nav">
                        {navItems.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                                {item}
                            </a>
                        ))}
                    </nav>

                    <div className="header-actions">
                        <button className="btn-outline hide-mobile">Buy Template</button>
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
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="mobile-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                        <button className="btn-outline w-full">Buy Template</button>
                    </div>
                </div>
            </header>

            <main className="qupe-main">
                <div className="hero-content">
                    <span className="qupe-badge">IdeaFlow AI</span>
                    <h1 className="qupe-title">
                        You&apos;ve never made a product plan this{" "}
                        <span className="orange-text">fast before</span>
                    </h1>
                    <p className="qupe-description">
                        Gain product clarity using our expert tools and insights to efficiently
                        manage your roadmap and enhance your startup vision.
                    </p>

                    <div className="qupe-search-wrapper">
                        <input
                            className="qupe-input"
                            placeholder="Describe your app idea (e.g., 'An AI fitness coach')..."
                            value={inputValue}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onSubmit(e.target.value);
                            }}
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus
                        />
                        <div className="input-hint">Press Enter to generate your roadmap</div>
                    </div>

                    <div className="qupe-examples">
                        <button className="example-btn" onClick={() => onSubmit("Build a food delivery app")}>
                            Food delivery
                        </button>
                        <button className="example-btn" onClick={() => onSubmit("Create a fitness tracking app")}>
                            Fitness tracking
                        </button>
                        <button className="example-btn" onClick={() => onSubmit("Design an AI study planner")}>
                            AI study planner
                        </button>
                    </div>

                    <div className="qupe-actions">
                        <button className="btn-primary" onClick={() => onSubmit(inputValue)}>
                            Get started - for free
                        </button>
                        <button className="btn-secondary">Discover IdeaFlow</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
