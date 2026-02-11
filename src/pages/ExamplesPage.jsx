import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { img: "/examples/brief.png", label: "Product Brief", position: "label-pos-1" },
  { img: "/examples/capabilities.png", label: "Core Capabilities", position: "label-pos-1" },
  { img: "/examples/flow.PNG", label: "User Journey", position: "label-pos-2" },
  { img: "/examples/build.png", label: "Tech Stack", position: "label-pos-3" },
  { img: "/examples/monetization.png", label: "Monetization", position: "label-pos-4" },
];

export default function ExamplesPage({ onSubmit, isNavigating }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleExampleClick = (query) => {
    if (!isNavigating) {
      onSubmit(query);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
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

      {/* BLUEPRINT PREVIEW SECTION */}
      <section className="blueprint-preview-section">
        <div className="landing-container">
          <h2 className="landing-section-title">
            See what <span className="orange-text">IdeaFlow</span> generates
          </h2>
          <p className="landing-subtitle">
            A complete product blueprint — structured, actionable, and ready to build.
            <br />
            <span style={{ fontSize: '0.9em', opacity: 0.8 }}>(Swipe to explore sections)</span>
          </p>

          <div className="browser-mockup-wrapper">
            <div className="browser-mockup">
              {/* Navigation Controls */}
              <div className="carousel-nav-btn nav-prev" onClick={prevSlide}>
                <ChevronLeft size={24} />
              </div>
              <div className="carousel-nav-btn nav-next" onClick={nextSlide}>
                <ChevronRight size={24} />
              </div>

              <div className="browser-header">
                <div className="browser-dot red"></div>
                <div className="browser-dot yellow"></div>
                <div className="browser-dot green"></div>
                <div className="browser-address-bar">ideaflow.app</div>
              </div>

              <div className="browser-content">
                <img
                  src={SLIDES[currentSlide].img}
                  alt={SLIDES[currentSlide].label}
                  className="blueprint-img"
                  key={currentSlide} // Force re-render for animation
                />

                {/* Dynamic Floating Label
                <div className={`floating-label ${SLIDES[currentSlide].position}`}>
                  {SLIDES[currentSlide].label}
                </div> */}

                {/* Dots Indicator */}
                <div className="carousel-dots">
                  {SLIDES.map((_, index) => (
                    <div
                      key={index}
                      className={`dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
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
