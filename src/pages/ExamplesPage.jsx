import React from "react";

export default function ExamplesPage({ onSubmit }) {
    return (
        <div className="page-hero-wrapper">
            <section id="examples" className="landing-section">
                <div className="landing-container">
                    <h2 className="landing-section-title">Expert <span className="orange-text">Examples</span></h2>
                    <div className="examples-grid-landing">
                        <div className="example-landing-card" onClick={() => onSubmit("Build a food delivery app")}>
                            <div className="example-img-placeholder">🍔</div>
                            <h3 className="example-title">Food Delivery</h3>
                            <p className="example-desc">Logistics, rider tracking, and menus.</p>
                        </div>
                        <div className="example-landing-card" onClick={() => onSubmit("Create a fitness tracking app")}>
                            <div className="example-img-placeholder">🏋️</div>
                            <h3 className="example-title">Fitness Tracking</h3>
                            <p className="example-desc">Workout logs, calories, and goals.</p>
                        </div>
                        <div className="example-landing-card" onClick={() => onSubmit("Design an AI study planner")}>
                            <div className="example-img-placeholder">📚</div>
                            <h3 className="example-title">AI Study Planner</h3>
                            <p className="example-desc">Smart scheduling and goal tracking.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
