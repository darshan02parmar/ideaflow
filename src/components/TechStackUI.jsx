import React from "react";
import { z } from "zod";

export default function TechStackUI({ stack }) {
    if (!stack || stack.length === 0) {
        return (
            <div className="empty-state">
                <p className="muted-text">No tech stack suggested yet.</p>
            </div>
        );
    }

    return (
        <div className="tech-stack-container">
            <div className="tech-badge-container">
                {stack.map((item, i) => (
                    <span key={i} className="tech-badge">
                        {item}
                    </span>
                ))}
            </div>
            <p className="tech-hint">
                These technologies are recommended for building the MVP.
            </p>
        </div>
    );
}

TechStackUI.propsSchema = z.object({
    stack: z
        .array(z.string())
        .describe("Suggested technologies for the product")
        .optional()
        .default([])
});
