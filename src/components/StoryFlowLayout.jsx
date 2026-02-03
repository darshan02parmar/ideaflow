import React from "react";

export default function StoryFlowLayout({ children }) {
    const rawItems = React.Children.toArray(children);

    // Map children to specific sections based on componentName prop (use latest version)
    const findComponent = (name) => rawItems.slice().reverse().find(child => child.props?.componentName === name);

    const overview = findComponent("IdeaOverviewUI");
    const userFlow = findComponent("UserFlowUI");
    const features = findComponent("FeaturesUI");
    const techStack = findComponent("TechStackUI");
    const roadmap = findComponent("RoadmapUI");

    return (
        <div className="story-flow-wrapper">
            {/* 1. PRODUCT BRIEF (Main Hero) */}
            <section className="story-section">
                <header className="story-section-header">
                    <span>💡</span> PRODUCT BRIEF
                </header>
                <div className="card hero-result-card">
                    {overview}
                </div>
            </section>

            {/* 2. WHAT IT DOES */}
            <section className="story-section">
                <header className="story-section-header">
                    <span>🚀</span> WHAT IT DOES
                </header>
                <div className="card">
                    {features}
                </div>
            </section>

            {/* 3. HOW IT WORKS */}
            <section className="story-section">
                <header className="story-section-header">
                    <span>🔁</span> HOW IT WORKS
                </header>
                <div className="card">
                    {userFlow}
                </div>
            </section>

            {/* 4. HOW TO BUILD (Side by Side) */}
            <section className="story-section">
                <header className="story-section-header">
                    <span>🛠️</span> HOW TO BUILD
                </header>
                <div className="story-grid two-col">
                    <div className="card">
                        <header className="card-header-small">TECH STACK</header>
                        {techStack}
                    </div>
                    <div className="card">
                        <header className="card-header-small">MVP ROADMAP</header>
                        {roadmap}
                    </div>
                </div>
            </section>
        </div>
    );
}
