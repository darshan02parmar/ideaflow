import React from "react";

export default function HowItWorksPage() {
    return (
        <div className="page-hero-wrapper">
            <section id="how-it-works" className="landing-section">
                <div className="landing-container">
                    <h2 className="landing-section-title">How it <span className="orange-text">works</span></h2>
                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3 className="step-title">Describe</h3>
                            <p className="step-text">Tell us your product idea in a few sentences. No complex prompts needed.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3 className="step-title">Generate</h3>
                            <p className="step-text">Watch as IdeaFlow AI crafts a comprehensive product plan in seconds.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3 className="step-title">Iterate</h3>
                            <p className="step-text">Refine and regenerate sections until your vision is perfect.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
