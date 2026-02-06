import React from "react";
import { z } from "zod";
import { Plus, X } from "lucide-react";

export default function TechStackUI({ stack, isRegenerating, isEditing = false, onUpdate }) {
    const handleTechChange = (index, value) => {
        const newStack = [...stack];
        newStack[index] = value;
        onUpdate({ stack: newStack });
    };

    const handleAddTech = () => {
        onUpdate({ stack: [...(stack || []), "New Tech"] });
    };

    const handleRemoveTech = (index) => {
        onUpdate({ stack: stack.filter((_, i) => i !== index) });
    };

    if (isRegenerating) {
        return (
            <div className="section-loading">
                <div className="loading-dots"><span></span><span></span><span></span></div>
                <p className="muted-loading-text">Assembling tech blueprint...</p>
            </div>
        );
    }

    if ((!stack || stack.length === 0) && !isEditing) {
        return (
            <div className="empty-state">
                <p className="muted-text">No tech stack suggested yet.</p>
            </div>
        );
    }

    const currentStack = stack || [];

    return (
        <div className={`tech-stack-container ${isEditing ? 'editing-mode' : ''}`}>
            <div className="tech-badge-container">
                {currentStack.map((item, i) => (
                    <span key={i} className="tech-badge">
                        {isEditing ? (
                            <div className="editable-badge-wrapper">
                                <input
                                    className="badge-edit-input"
                                    value={item}
                                    onChange={(e) => handleTechChange(i, e.target.value)}
                                />
                                <button className="remove-badge-btn" onClick={() => handleRemoveTech(i)}>
                                    <X size={10} />
                                </button>
                            </div>
                        ) : item}
                    </span>
                ))}
                {isEditing && (
                    <button className="add-tech-btn" onClick={handleAddTech}>
                        <Plus size={14} /> Add Tech
                    </button>
                )}
            </div>
            {!isEditing && (
                <p className="tech-hint">
                    These technologies are recommended for building the MVP.
                </p>
            )}
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
