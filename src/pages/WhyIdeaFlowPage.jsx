import React from "react";
import {
    Zap,
    RefreshCcw,
    BrainCircuit,
    LayoutTemplate,
    Rocket,
    CheckCircle2,
    XCircle,
    Target,
    Layers,
    Users,
    Server,
    Sparkles,
    Ban
} from "lucide-react";

export default function WhyIdeaFlowPage() {
    return (
        <div className="why-ideaflow-container">
            {/* HERO SECTION */}
            <section className="landing-section-why">
                <div className="landing-container">
                    <h1 className="landing-section-title">⭐Why <span className="orange-text">IdeaFlow</span> ?</h1>
                    <p className="qupe-description">A modern approach to product planning. Stop wrestling with docs and start building.</p>

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

            {/* HYBRID INTELLIGENCE */}
            <section className="landing-section darker">
                <div className="landing-container">
                    <h2 className="landing-section-title">
                        <BrainCircuit size={32} style={{ display: 'inline', marginBottom: -6, marginRight: 12 }} />
                        Hybrid Intelligence <span className="orange-text">Architecture</span>
                    </h2>
                    <p className="qupe-description">Reliable by design. We combine the best of both worlds.</p>

                    <div className="features-grid-vertical">
                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <Sparkles size={24} />
                            </div>
                            <h3>Live AI (Tambo)</h3>
                            <p>Real-time updates and creative generation using state-of-the-art LLMs when connectivity is optimal.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <Server size={24} />
                            </div>
                            <h3>Deterministic Engine</h3>
                            <p>Consistent performance and zero-downtime demos, running locally to ensure you never lose momentum.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <Target size={24} />
                            </div>
                            <h3>Predictable Outputs</h3>
                            <p>Ideally structured for product builders. This differentiates us from generic chat interfaces.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* GENERATIVE UI */}
            <section className="landing-section">
                <div className="landing-container">
                    <h2 className="landing-section-title">Built with <span className="orange-text">Generative UI</span></h2>
                    <p className="qupe-description">AI that renders functional components, not just text blocks.</p>

                    <div className="steps-container">
                        <div className="step-card">
                            <h3 className="step-title"><LayoutTemplate size={20} className="orange-text" /> UI-First</h3>
                            <p className="step-text">Each section is a functional UI component, allowing for rich interaction.</p>
                        </div>
                        <div className="step-card">
                            <h3 className="step-title"><Layers size={20} className="orange-text" /> Structured Schemas</h3>
                            <p className="step-text">AI fills precise data structures, ensuring consistency and accuracy across your roadmap.</p>
                        </div>
                        <div className="step-card">
                            <h3 className="step-title"><RefreshCcw size={20} className="orange-text" /> Scoped Regeneration</h3>
                            <p className="step-text">Update single components without destroying the rest of your plan.</p>
                        </div>
                    </div>

                    <blockquote className="quote-callout">
                        "Generative UI is a game-changer. It transforms AI from a text generator into a structured product collaborator."
                    </blockquote>
                </div>
            </section>

            {/* AUDIENCE */}
            <section className="landing-section darker">
                <div className="landing-container">
                    <h2 className="landing-section-title">
                        <Rocket size={32} style={{ display: 'inline', marginBottom: -6, marginRight: 12 }} />
                        Who <span className="orange-text">It’s For</span>
                    </h2>
                    <div className="user-types-grid">
                        <div className="user-type"><Users size={18} /> Hackathon Teams</div>
                        <div className="user-type"><Zap size={18} /> Indie Founders</div>
                        <div className="user-type"><Layers size={18} /> Product Managers</div>
                        <div className="user-type"><Rocket size={18} /> Builders</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
