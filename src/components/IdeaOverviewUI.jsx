import React from "react";
import { z } from "zod";

export default function IdeaOverviewUI({ summary, aiInsight, targetUsers, valueTags, marketSignal, onRewrite, isRewriting, isStatic = false }) {
    if (!summary) {
        return (
            <div className="empty-state">
                <p className="muted-text">Waiting for idea summary...</p>
            </div>
        );
    }

    // Split summary into highlighted first line
    const sentences = summary.split(". ");
    const firstSentence = sentences[0] + (sentences.length > 1 ? "." : "");
    const rest = sentences.slice(1).join(". ");

    // Default chips if AI doesn't provide them
    const defaultTags = ["🎯 Goal-driven", "📊 Progress tracking", "🔔 Smart reminders", "🧠 AI personalization"];
    const displayTags = valueTags && valueTags.length > 0 ? valueTags : defaultTags;

    return (
        <div className="overview-container hero-result-content">
            <div className="overview-header">
                <span className="overview-label">PRODUCT SUMMARY</span>
                {!isStatic && (
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

            <p className="overview-lead">{firstSentence}</p>
            <p className="overview-text">{rest}</p>

            {targetUsers && (
                <div className="target-users-line">
                    <span className="meta-label-small">Target users:</span> {targetUsers}
                </div>
            )}

            <div className="value-chips-container">
                {displayTags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="value-chip">{tag}</span>
                ))}
            </div>

            {aiInsight && (
                <div className="ai-insight-box">
                    <span className="insight-label">AI Insight</span>
                    <p className="ai-insight-text">{aiInsight}</p>
                </div>
            )}

            <div className="overview-footer">
                {marketSignal && (
                    <div className="market-signal-line">
                        <span className="meta-label-small">Market signal:</span> {marketSignal}
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
