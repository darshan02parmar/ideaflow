import React from "react";

export default function Hero({ onSubmit, setInput, inputValue }) {
    return (
        <div className="qupe-wrapper">
            {/* Background Orbs */}
            <div className="orb orb-top"></div>
            <div className="orb orb-bottom"></div>

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
                            id="hero-search-input"
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
