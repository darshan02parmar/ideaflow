import React from "react";

export default function StoryFlowLayout({ children, onRegenerate, isRegenerating = {}, isStatic = false }) {
    const rawItems = React.Children.toArray(children);

    // Map children to specific sections based on componentName prop (use latest version)
    const findComponent = (name) => rawItems.slice().reverse().find(child => child.props?.componentName === name);

    const overview = findComponent("IdeaOverviewUI");
    const problems = findComponent("ProblemsWeSolveUI");
    const userFlow = findComponent("UserFlowUI");
    const features = findComponent("FeaturesUI");
    const techStack = findComponent("TechStackUI");
    const roadmap = findComponent("RoadmapUI");
    const businessModel = findComponent("BusinessModelUI");

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

            {/* 2. PROBLEMS WE SOLVE */}
            <section className="story-section">
                <header className="story-section-header">
                    <span>!</span> PROBLEMS WE SOLVE
                </header>
                <div className="card">
                    {problems}
                </div>
            </section>

            {/* 2. CORE CAPABILITIES */}
            <section className="story-section">
                <header className="story-section-header">
                    <span>🚀</span> CORE CAPABILITIES
                </header>
                <div className="card">
                    {features}
                </div>
            </section>

            {/* 3. USER JOURNEY */}
            <section className="story-section">
                <header className="story-section-header">
                    <div className="header-content">
                        <span>🔁</span> USER JOURNEY
                    </div>
                    {!isStatic && !isRegenerating["UserFlowUI"] && (
                        <button className="regen-btn" onClick={() => onRegenerate?.("UserFlowUI")}>
                            ✨ Regenerate
                        </button>
                    )}
                </header>
                <div className="card">
                    {userFlow}
                </div>
            </section>

            {/* 4. BUILD BLUEPRINT (Side by Side) */}
            <section className="story-section">
                <header className="story-section-header">
                    <div className="header-content">
                        <span>🛠️</span> BUILD BLUEPRINT
                    </div>
                    {!isStatic && !isRegenerating["TechStackUI"] && (
                        <button className="regen-btn" onClick={() => onRegenerate?.("TechStackUI")}>
                            ✨ Regenerate
                        </button>
                    )}
                </header>
                <div className="story-grid two-col">
                    <div className="card">
                        <header className="card-header-small">
                            TECH STACK
                        </header>
                        {techStack}
                    </div>
                    <div className="card">
                        <header className="card-header-small">MVP ROADMAP</header>
                        {roadmap}
                    </div>
                </div>
            </section>


            {/* 5. BUSINESS MODEL */}
            <section className="story-section">
                <header className="story-section-header">
                    <span>$</span> BUSINESS MODEL
                </header>
                <div className="card">
                    {businessModel}
                </div>
            </section>

        </div>
    );
}
