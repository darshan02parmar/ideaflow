import React from "react";
import { z } from "zod";

export default function IdeaOverviewUI({ summary, aiInsight, targetUsers, valueTags, marketSignal, onRewrite, isRewriting, isStatic = false, isEditing = false, onUpdate }) {
    if (!summary && !isEditing) {
        return (
            <div className="empty-state">
                <p className="muted-text">Waiting for idea summary...</p>
            </div>
        );
    }

    const handleInputChange = (field, value) => {
        onUpdate({ summary, aiInsight, targetUsers, valueTags, marketSignal, [field]: value });
    };

    // Split summary into highlighted first line for display only
    const sentences = summary.split(". ");
    const firstSentence = sentences[0] + (sentences.length > 1 ? "." : "");
    const rest = sentences.slice(1).join(". ");

    // Default chips if AI doesn't provide them
    const defaultTags = ["🎯 Goal-driven", "📊 Progress tracking", "🔔 Smart reminders", "🧠 AI personalization"];
    const displayTags = valueTags && valueTags.length > 0 ? valueTags : defaultTags;

    return (
        <div className={`overview-container hero-result-content ${isEditing ? 'editing-mode' : ''}`}>
            <div className="overview-header">
                <span className="overview-label">PRODUCT SUMMARY</span>
                {!isStatic && !isEditing && (
                    <button
                        className="rewrite-btn"
                        onClick={onRewrite}
                        disabled={isRewriting}
                        style={{ opacity: isRewriting ? 0.5 : 1, cursor: isRewriting ? 'wait' : 'pointer' }}
                    >
                        {isRewriting ? "✨ Rewriting..." : "✨ Rewrite"}
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="edit-fields-group">
                    <textarea
                        className="editable-textarea summary-edit"
                        value={summary}
                        onChange={(e) => handleInputChange('summary', e.target.value)}
                        placeholder="Product Summary"
                    />
                </div>
            ) : (
                <>
                    <p className="overview-lead">{firstSentence}</p>
                    <p className="overview-text">{rest}</p>
                </>
            )}

            {(targetUsers || isEditing) && (
                <div className="target-users-line">
                    <span className="meta-label-small">Target users:</span>
                    {isEditing ? (
                        <input
                            className="editable-input"
                            value={targetUsers}
                            onChange={(e) => handleInputChange('targetUsers', e.target.value)}
                        />
                    ) : targetUsers}
                </div>
            )}

            <div className="value-chips-container">
                {displayTags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="value-chip">{tag}</span>
                ))}
            </div>

            {(aiInsight || isEditing) && (
                <div className="ai-insight-box">
                    <span className="insight-label">AI Insight</span>
                    {isEditing ? (
                        <textarea
                            className="editable-textarea insight-edit"
                            value={aiInsight}
                            onChange={(e) => handleInputChange('aiInsight', e.target.value)}
                        />
                    ) : (
                        <p className="ai-insight-text">{aiInsight}</p>
                    )}
                </div>
            )}

            <div className="overview-footer">
                {(marketSignal || isEditing) && (
                    <div className="market-signal-line">
                        <span className="meta-label-small">Market signal:</span>
                        {isEditing ? (
                            <input
                                className="editable-input"
                                value={marketSignal}
                                onChange={(e) => handleInputChange('marketSignal', e.target.value)}
                            />
                        ) : marketSignal}
                    </div>
                )}
                <div className="overview-meta">
                    Generated in 1.3s · High confidence
                </div>
            </div>
        </div>
    );
}

IdeaOverviewUI.propsSchema = z.object({
    summary: z
        .string()
        .describe("High-level summary of the product idea")
        .optional()
        .default(""),
    aiInsight: z
        .string()
        .describe("One-sentence psychological trigger or market fit insight")
        .optional()
        .default(""),
    targetUsers: z
        .string()
        .describe("Primary audience for the product, e.g., 'Students, fitness enthusiasts'")
        .optional()
        .default(""),
    valueTags: z
        .array(z.string())
        .describe("3-4 short chips representing core value pillars")
        .optional()
        .default([]),
    marketSignal: z
        .string()
        .describe("Brief signal about viability or retention, e.g., 'High daily engagement potential'")
        .optional()
        .default("")
});
