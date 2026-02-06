import React from "react";

export default function WhyIdeaFlowPage() {
    return (
        <div className="why-ideaflow-container">
            <section className="landing-section-why">
                <div className="landing-container">
                    <h1 className="landing-section-title">⭐ Why <span className="orange-text">IdeaFlow</span></h1>
                    <p className="qupe-description">A modern approach to product planning.</p>

                    <div className="comparison-grid">
                        <div className="comparison-card traditional">
                            <h3 className="card-title">🔁 Traditional Planning</h3>
                            <p className="card-subtitle">Slow, fragmented, and manual.</p>
                            <ul className="comparison-list">
                                <li>❌ Docs scattered across tools</li>
                                <li>❌ No clear structure</li>
                                <li>❌ Hard to iterate</li>
                                <li>❌ Ideas die early</li>
                            </ul>
                        </div>
                        <div className="comparison-card ideaflow">
                            <h3 className="card-title">⚡ IdeaFlow Way</h3>
                            <p className="card-subtitle">Structured thinking, instantly.</p>
                            <ul className="comparison-list">
                                <li>✅ One input → a complete, execution-ready blueprint</li>
                                <li>✅ Opinionated structure — not random AI text</li>
                                <li>✅ Built for iteration, not overthinking</li>
                                <li>✅ Actionable output in seconds</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-section darker">
                <div className="landing-container">
                    <h2 className="landing-section-title">🧠 Hybrid Intelligence <span className="orange-text">Architecture</span></h2>
                    <p className="qupe-description">Reliable by design.</p>
                    <div className="features-grid-vertical">
                        <div className="feature-item">
                            <h3>Live AI (Tambo) when available</h3>
                            <p>Real-time updates and creative generation using state-of-the-art LLMs.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Local deterministic engine as fallback</h3>
                            <p>Consistent performance and zero downtime demos, even in edge cases.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Predictable outputs</h3>
                            <p>This is a HUGE differentiator — most teams don’t think like this.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-section">
                <div className="landing-container">
                    <h2 className="landing-section-title">🧱 Built with <span className="orange-text">Generative UI</span></h2>
                    <p className="qupe-description">AI that renders product components, not paragraphs.</p>
                    <div className="steps-container">
                        <div className="step-card">
                            <h3 className="step-title">UI-first</h3>
                            <p className="step-text">Each section is a functional UI component, not just text blocks.</p>
                        </div>
                        <div className="step-card">
                            <h3 className="step-title">Structured Schemas</h3>
                            <p className="step-text">AI fills precise data structures, ensuring consistency and accuracy.</p>
                        </div>
                        <div className="step-card">
                            <h3 className="step-title">Scoped Regeneration</h3>
                            <p className="step-text">Update single components without destroying the rest of your plan.</p>
                        </div>
                    </div>
                    <blockquote className="quote-callout">
                        "Generative UI is a game-changer for product planning. It transforms AI from a text generator into a structured collaborator."
                    </blockquote>
                </div>
            </section>

            <section className="landing-section darker">
                <div className="landing-container">
                    <h2 className="landing-section-title">🚀 Who <span className="orange-text">It’s For</span></h2>
                    <div className="user-types-grid">
                        <div className="user-type">Hackathon teams</div>
                        <div className="user-type">Indie founders</div>
                        <div className="user-type">Product managers</div>
                        <div className="user-type">Builders validating ideas fast</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
