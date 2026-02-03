import { useState } from "react";
import { z } from "zod";

export default function RoadmapUI({ phases }) {
    const [expanded, setExpanded] = useState(false);

    if (!phases || phases.length === 0) {
        return (
            <div className="empty-state">
                <p className="muted-text">No roadmap phases generated.</p>
            </div>
        );
    }

    const visiblePhases = expanded ? phases : phases.slice(0, 5);
    const hasMore = phases.length > 5;

    return (
        <div className="roadmap-wrapper">
            <div className="roadmap-container">
                {visiblePhases.map((phase, i) => (
                    <div key={i} className="roadmap-phase">
                        <div className="phase-badge">Phase {i + 1}</div>
                        <div className="phase-content">
                            <p className="phase-title">{phase}</p>
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <button
                    className="expansion-toggle"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "↑ Show less" : `↓ Show full roadmap (${phases.length} phases)`}
                </button>
            )}
        </div>
    );
}

RoadmapUI.propsSchema = z.object({
    phases: z
        .array(z.string())
        .describe("Phases of MVP development roadmap")
        .optional()
        .default([])
});
