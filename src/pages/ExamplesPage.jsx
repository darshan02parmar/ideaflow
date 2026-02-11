import React from "react";

export default function ExamplesPage({ onSubmit, isNavigating }) {
  const handleExampleClick = (query) => {
    if (!isNavigating) {
      onSubmit(query);
    }
  };

  return (
    <div className="page-hero-wrapper">
      <section id="examples" className="landing-section-example">
        <div className="landing-container">
          <h2 className="landing-section-title">
            Expert <span className="orange-text">Examples</span>
          </h2>

          <p className="landing-subtitle">
            Click an example to instantly generate a complete product blueprint —
            features, user flow, tech stack, and MVP roadmap.
          </p>

          {/* CORE EXAMPLES */}
          <div className={`examples-grid-landing ${isNavigating ? "disabled-grid" : ""}`} style={isNavigating ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
            <ExampleCard
              emoji="🍔"
              title="Food Delivery Platform"
              desc="End-to-end logistics, live order tracking, payments, and scalability."
              meta="Marketplace · Real-time · Payments"
              onClick={() => handleExampleClick("Build a food delivery app")}
            />

            <ExampleCard
              emoji="🏋️"
              title="Fitness Tracking App"
              desc="Personalized workouts, progress tracking, habits, and motivation loops."
              meta="Mobile · Health · Engagement"
              onClick={() => handleExampleClick("Create a fitness tracking app")}
            />

            <ExampleCard
              emoji="📚"
              title="AI Study Planner"
              desc="Smart scheduling, adaptive plans, reminders, and analytics."
              meta="AI · Productivity · Students"
              onClick={() => handleExampleClick("Design an AI study planner")}
            />
          </div>

          {/* ADVANCED EXAMPLES */}
          <div className="examples-secondary" style={isNavigating ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
            <h3 className="examples-subheading">More advanced ideas</h3>

            <div className="examples-grid-landing small">
              <ExampleMini
                title="B2B SaaS Dashboard"
                onClick={() => handleExampleClick("Build a B2B SaaS analytics dashboard")}
              />
              <ExampleMini
                title="AI Resume Analyzer"
                onClick={() => handleExampleClick("Create an AI-powered resume analysis tool")}
              />
              <ExampleMini
                title="Smart Parking System"
                onClick={() => handleExampleClick("Design a smart parking management system")}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------- Components -------- */

function ExampleCard({ emoji, title, desc, meta, onClick }) {
  return (
    <div className="example-landing-card" onClick={onClick}>
      <div className="example-img-placeholder">{emoji}</div>
      <h3 className="example-title">{title}</h3>
      <p className="example-desc">{desc}</p>
      <div className="example-meta">{meta}</div>
      <div className="example-cta">Click to generate →</div>
    </div>
  );
}

function ExampleMini({ title, onClick }) {
  return (
    <div className="example-mini-card" onClick={onClick}>
      {title}
    </div>
  );
}
