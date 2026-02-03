import React, { useState } from "react";
import { z } from "zod";

export default function UserFlowUI({ steps, aiInsight }) {
    const [expanded, setExpanded] = useState(false);

    if (!steps || steps.length === 0) {
        return (
            <div className="empty-state">
                <p className="muted-text">Waiting for user journey...</p>
            </div>
        );
    }

    // Logic to group steps into phases (Simulated Pro Move)
    const phases = [
        {
            title: "ONBOARDING & ACTIVATION",
            range: [0, 3],
            time: "~2 min",
            steps: steps.slice(0, 3)
        },
        {
            title: "CORE EXPERIENCE",
            range: [3, 7],
            time: "Daily",
            steps: steps.slice(3, 7)
        },
        {
            title: "RETENTION & GROWTH",
            range: [7, 100],
            time: "Long-term",
            steps: steps.slice(7)
        }
    ].filter(phase => phase.steps.length > 0);

    // Initial view shows only first 2 phases unless expanded
    const visiblePhases = expanded ? phases : phases.slice(0, 2);
    const hasHiddenPhases = phases.length > 2;

    return (
        <div className="user-flow-wrapper">
            <div className="section-intro">
                This is the typical end-to-end experience for a user.
            </div>

            <div className="phases-container">
                {visiblePhases.map((phase, idx) => (
                    <div key={idx} className="phase-block">
                        <div className="phase-header">
                            <span className="phase-title">{phase.title}</span>
                            <span className="phase-time">{phase.time}</span>
                        </div>

                        <div className="timeline-group">
                            {phase.steps.map((step, sIdx) => (
                                <div key={sIdx} className="timeline-item group-item">
                                    <div className="timeline-marker">{phase.range[0] + sIdx + 1}</div>
                                    <div className="timeline-content">
                                        <p className="timeline-text">{step}</p>
                                        <button
                                            className="simulate-btn"
                                            onClick={() => console.log(`Simulating step: ${step}`)}
                                        >
                                            ▶ Preview
                                        </button>
                                    </div>
                                    <div className="timeline-connector"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {hasHiddenPhases && (
                <button
                    className="expansion-toggle"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "↑ Show less" : `↓ Show full journey (${phases.length} phases)`}
                </button>
            )}

            {aiInsight && (
                <div className="journey-insight-box">
                    <span className="insight-label">AI Insight</span>
                    <p className="ai-insight-text">{aiInsight}</p>
                </div>
            )}
        </div>
    );
}

UserFlowUI.propsSchema = z.object({
    steps: z.array(z.string()).describe("List of sequential user steps").optional().default([]),
    aiInsight: z.string().describe("Strategic insight about the user journey's retention or habit formation").optional()
});
