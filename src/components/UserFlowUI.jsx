import React, { useState } from "react";
import { z } from "zod";
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react";

export default function UserFlowUI({ steps, aiInsight, isRegenerating, isEditing = false, isImproving = false, onUpdate, onImproveAI }) {
    const [expanded, setExpanded] = useState(false);

    const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        onUpdate({ steps: newSteps });
    };

    const handleAddStep = () => {
        onUpdate({ steps: [...steps, "New journey step..."] });
    };

    const handleRemoveStep = (index) => {
        onUpdate({ steps: steps.filter((_, i) => i !== index) });
    };

    if (isRegenerating) {
        return (
            <div className="section-loading">
                <div className="loading-dots"><span></span><span></span><span></span></div>
                <p className="muted-loading-text">Generating user journey...</p>
            </div>
        );
    }

    if ((!steps || steps.length === 0) && !isEditing) {
        return (
            <div className="empty-state">
                <p className="muted-text">Waiting for user journey...</p>
            </div>
        );
    }

    const currentSteps = steps || [];

    // Logic to group steps into phases
    const phases = [
        {
            title: "ONBOARDING & ACTIVATION",
            range: [0, 3],
            time: "~2 min",
            steps: currentSteps.slice(0, 3)
        },
        {
            title: "CORE EXPERIENCE",
            range: [3, 7],
            time: "Daily",
            steps: currentSteps.slice(3, 7)
        },
        {
            title: "RETENTION & GROWTH",
            range: [7, 100],
            time: "Long-term",
            steps: currentSteps.slice(7)
        }
    ].filter(phase => phase.steps.length > 0 || (isEditing && phase.title === "ONBOARDING & ACTIVATION"));

    const visiblePhases = expanded || isEditing ? phases : phases.slice(0, 2);
    const hasHiddenPhases = phases.length > 2 && !isEditing;

    return (
        <div className={`user-flow-wrapper ${isEditing ? 'editing-mode' : ''}`}>
            <div className="section-intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                This is the typical end-to-end experience for a user.
                {isEditing && (
                    <button
                        className={`improve-ai-btn small ${isImproving ? 'loading' : ''}`}
                        onClick={onImproveAI}
                        disabled={isImproving}
                    >
                        {isImproving ? <Loader2 className="spin" size={12} /> : <Sparkles size={12} />}
                        {isImproving ? "Refining..." : "Improve with AI"}
                    </button>
                )}
            </div>

            <div className="phases-container">
                {visiblePhases.map((phase, idx) => (
                    <div key={idx} className="phase-block">
                        <div className="phase-header">
                            <span className="phase-title">{phase.title}</span>
                            {!isEditing && <span className="phase-time">{phase.time}</span>}
                        </div>

                        <div className="timeline-group">
                            {phase.steps.map((step, sIdx) => {
                                const globalIdx = currentSteps.indexOf(step);
                                return (
                                    <div key={sIdx} className="timeline-item group-item">
                                        <div className="timeline-marker">{globalIdx !== -1 ? globalIdx + 1 : "?"}</div>
                                        <div className="timeline-content">
                                            {isEditing ? (
                                                <div className="editable-step-wrapper">
                                                    <textarea
                                                        className="editable-textarea step-edit"
                                                        value={step}
                                                        onChange={(e) => handleStepChange(globalIdx, e.target.value)}
                                                    />
                                                    <button className="remove-step-btn" onClick={() => handleRemoveStep(globalIdx)}>
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="timeline-text">{step}</p>
                                                    <button
                                                        className="simulate-btn"
                                                        onClick={() => console.log(`Simulating step: ${step}`)}
                                                    >
                                                        ▶ Preview
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        <div className="timeline-connector"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {isEditing && (
                <button className="add-step-btn" onClick={handleAddStep}>
                    <Plus size={16} /> Add Journey Step
                </button>
            )}

            {hasHiddenPhases && (
                <button
                    className="expansion-toggle"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "↑ Show less" : `↓ Show full journey (${phases.length} phases)`}
                </button>
            )}

            {(aiInsight || isEditing) && (
                <div className="journey-insight-box">
                    <span className="insight-label">AI Insight</span>
                    {isEditing ? (
                        <textarea
                            className="editable-textarea insight-edit"
                            value={aiInsight}
                            onChange={(e) => onUpdate({ aiInsight: e.target.value, steps: currentSteps })}
                        />
                    ) : (
                        <p className="ai-insight-text">{aiInsight}</p>
                    )}
                </div>
            )}
        </div>
    );
}

UserFlowUI.propsSchema = z.object({
    steps: z.array(z.string()).describe("List of sequential user steps").optional().default([]),
    aiInsight: z.string().describe("Strategic insight about the user journey's retention or habit formation").optional()
});
