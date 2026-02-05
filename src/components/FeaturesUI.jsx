/* eslint-disable */
import React from "react";
import { z } from "zod";

function getFeatureIcon(text) {
    const lower = text.toLowerCase();
    if (lower.includes("ai") || lower.includes("smart") || lower.includes("intelligence")) return "🧠";
    if (lower.includes("analytics") || lower.includes("data") || lower.includes("chart") || lower.includes("metric")) return "📊";
    if (lower.includes("notification") || lower.includes("alert") || lower.includes("remind")) return "🔔";
    if (lower.includes("social") || lower.includes("share") || lower.includes("community") || lower.includes("friend")) return "👥";
    if (lower.includes("integration") || lower.includes("connect") || lower.includes("sync") || lower.includes("api")) return "🔗";
    if (lower.includes("security") || lower.includes("auth") || lower.includes("privacy")) return "🔒";
    if (lower.includes("customize") || lower.includes("personal")) return "🎨";
    return "✨";
}

function getFeatureCategory(index, total) {
    if (index < Math.ceil(total * 0.4)) return "CORE FEATURES";
    if (index < Math.ceil(total * 0.7)) return "ENGAGEMENT";
    return "INTEGRATIONS";
}

export default function FeaturesUI({ features, aiInsight, showToast }) {
    if (!features || features.length === 0) {
        return (
            <div className="empty-state">
                <p className="muted-text">No features generated for this idea.</p>
            </div>
        );
    }

    // Group features into categories
    const categorizedFeatures = {
        "CORE FEATURES": [],
        "ENGAGEMENT": [],
        "INTEGRATIONS": []
    };

    features.forEach((feature, i) => {
        const category = getFeatureCategory(i, features.length);
        categorizedFeatures[category].push(feature);
    });

    const handleCopy = () => {
        const text = features.join("\n");
        navigator.clipboard.writeText(text);
        if (showToast) {
            showToast("📋 Features copied to clipboard!");
        }
    };

    return (
        <div className="features-wrapper">
            <div className="features-header-row">
                <p className="features-ai-summary">
                    <span className="ai-label">AI Summary:</span> This product focuses on personalization, habit formation, and seamless integration.
                </p>
                <button className="copy-features-btn" onClick={handleCopy}>Copy list</button>
            </div>

            <div className="features-layout">
                {Object.entries(categorizedFeatures).map(([category, items]) => (
                    items.length > 0 && (
                        <div key={category} className="feature-category-group">
                            <h4 className="category-title">{category}</h4>
                            <div className="features-grid">
                                {items.map((feature, i) => (
                                    <div key={i} className="feature-item" title={`Why this matters: Improves value through ${feature.toLowerCase()}.`}>
                                        <span className="feature-icon">
                                            {getFeatureIcon(feature)}
                                        </span>
                                        <div className="feature-content">
                                            <span className="feature-text">{feature}</span>
                                            {i % 2 === 0 && <span className="feature-tag">MVP</span>}
                                            {i % 3 === 0 && i % 2 !== 0 && <span className="feature-tag core">Core</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

FeaturesUI.propsSchema = z.object({
    features: z
        .array(z.string())
        .describe("Main features of the product")
        .optional()
        .default([])
});
