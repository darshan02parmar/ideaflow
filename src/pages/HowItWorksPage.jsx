import React from "react";

export default function HowItWorksPage() {
  return (
    <div className="page-hero-wrapper">
      {/* HERO */}
      <section id="how-it-works" className="landing-section-how">
        <div className="landing-container">
          <h2 className="landing-section-title">
            How it <span className="orange-text">works</span>
          </h2>
          <p className="landing-subtitle">
            From a raw idea to a structured product blueprint - in minutes.
          </p>

          {/* STEPS */}
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Describe</h3>
              <p className="step-text">
                Share your product idea in plain language. No prompt
                engineering. No templates.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Generate</h3>
              <p className="step-text">
                IdeaFlow transforms your idea into a complete product plan -
                features, user journey, architecture, and roadmap.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Iterate</h3>
              <p className="step-text">
                Regenerate individual sections and refine your vision without
                starting over.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UNDER THE HOOD */}
      <section className="landing-section subtle-bg">
        <div className="landing-container narrow">
          <h3 className="section-heading">
            What happens <span className="orange-text">under the hood</span>
          </h3>

          <div className="explain-grid">
            <div className="explain-card">
              <h4>Structured Intelligence</h4>
              <p>
                IdeaFlow doesn't generate random text. Every output is mapped
                to a predefined product structure - ensuring clarity and
                consistency.
              </p>
            </div>

            <div className="explain-card">
              <h4>Generative UI</h4>
              <p>
                Each section (Product Brief, User Journey, Tech Stack) is
                generated as a UI component, not static content.
              </p>
            </div>

            <div className="explain-card">
              <h4>Hybrid Engine</h4>
              <p>
                IdeaFlow uses live AI when available, and a deterministic local
                engine as a reliable fallback - so results are instant and
                never break.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT'S FASTER */}
      <section className="landing-section">
        <div className="landing-container narrow">
          <h3 className="section-heading">
            Why this is <span className="orange-text">faster</span>
          </h3>

          <ul className="comparison-list">
            <li>Traditional planning requires docs, tools, and meetings</li>
            <li>Ideas get lost between brainstorming and execution</li>
            <li>
              IdeaFlow generates a shared, execution-ready blueprint instantly
            </li>
            <li>Everything stays structured, editable, and visual</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-section center">
        <h3 className="cta-heading">Ready to turn your idea into a plan?</h3>
        <p className="cta-subtext">
          Describe your idea and let IdeaFlow do the heavy lifting.
        </p>
      </section>
    </div>
  );
}
